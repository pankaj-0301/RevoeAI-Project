"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableList } from '@/components/table-list';
import { CreateTableDialog } from '@/components/create-table-dialog';
import { isAuthenticated, logout } from '@/lib/auth';
import { getTables } from '@/lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [tables, setTables] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    loadTables();
  }, [router]);

  const loadTables = async () => {
    try {
      const data = await getTables();
      setTables(data);
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Tables</h2>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Table
          </Button>
        </div>

        {tables.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No tables yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create your first table to start managing your data.
              </p>
            </CardContent>
          </Card>
        ) : (
          <TableList tables={tables} onUpdate={loadTables} />
        )}

        <CreateTableDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onTableCreated={loadTables}
        />
      </main>
    </div>
  );
}