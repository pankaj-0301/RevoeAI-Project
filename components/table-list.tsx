"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableView } from '@/components/table-view';

interface Table {
  _id: string;
  name: string;
  columns: Array<{ name: string; type: string }>;
}

interface TableListProps {
  tables: Table[];
  onUpdate: () => void;
}

export function TableList({ tables, onUpdate }: TableListProps) {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  return (
    <div className="grid gap-6">
      {selectedTable ? (
        <TableView
  table={{ ...selectedTable, customColumns: selectedTable.customColumns || [] }}
  onBack={() => setSelectedTable(null)}
  onUpdate={onUpdate}
/>

      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tables.map((table) => (
            <Card
              key={table._id}
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedTable(table)}
            >
              <CardHeader>
                <CardTitle>{table.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {table.columns.length} columns
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
