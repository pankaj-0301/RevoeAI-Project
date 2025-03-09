"use client"

import { useEffect, useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddColumnDialog } from '@/components/add-column-dialog';
import { getTableData, socket } from '@/lib/api';
import { format } from 'date-fns';

interface Column {
  name: string;
  type: string;
}

interface TableViewProps {
  table: {
    _id: string;
    name: string;
    columns: Column[];
    customColumns?: Column[];
  };
  onBack: () => void;
  onUpdate: () => void;
}

export function TableView({ table, onBack, onUpdate }: TableViewProps) {
  const [data, setData] = useState<any[]>([]);
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    
    socket.connect();
    socket.on('sheetUpdate', (newData) => {
      setData(newData);
    });

    return () => {
      socket.off('sheetUpdate');
      socket.disconnect();
    };
  }, [table._id]);

  const loadData = async () => {
    try {
      const tableData = await getTableData(table._id);
      setData(tableData);
    } catch (error) {
      console.error('Error loading table data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCellValue = (value: any, type: string) => {
    if (!value) return '';
    if (type === 'date') {
      return format(new Date(value), 'PP');
    }
    return value;
  };

  const allColumns = [...table.columns, ...(table.customColumns || [])];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">{table.name}</h2>
        </div>
        <Button onClick={() => setIsAddColumnOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {allColumns.map((column) => (
                <TableHead key={column.name}>
                  {column.name}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({column.type})
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={allColumns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={allColumns.length}
                  className="h-24 text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow key={i}>
                  {allColumns.map((column) => (
                    <TableCell key={column.name}>
                      {formatCellValue(row[column.name], column.type)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddColumnDialog
        tableId={table._id}
        open={isAddColumnOpen}
        onOpenChange={setIsAddColumnOpen}
        onColumnAdded={onUpdate}
      />
    </div>
  );
}
