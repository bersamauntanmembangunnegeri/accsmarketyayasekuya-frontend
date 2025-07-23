import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminPages from '../components/AdminPages';
import AdminFooter from '../components/AdminFooter';
import AdminHeader from '../components/AdminHeader';

const AdminPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage your website content and settings</p>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="header">Header</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          <AdminPages />
        </TabsContent>

        <TabsContent value="footer" className="space-y-6">
          <AdminFooter />
        </TabsContent>

        <TabsContent value="header" className="space-y-6">
          <AdminHeader />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

