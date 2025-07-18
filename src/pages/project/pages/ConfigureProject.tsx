

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Input from '@/components/ui/input';
import { SearchIcon, FilterIcon, MoreDotIcon } from '@/icons';
import ProjectSidebar from '@/components/project-sidebar';

interface User {
  id: string;
  fullName: string;
  role: string;
  unitNo: string;
  trades: string;
  status: 'Active' | 'Invite Sent';
}

const mockUsers: User[] = [
  { id: '1', fullName: 'John', role: 'Builder', unitNo: 'All', trades: 'N/A', status: 'Active' },
  { id: '2', fullName: 'Test Pilot', role: 'Sales Agent', unitNo: 'All', trades: 'N/A', status: 'Invite Sent' },
  { id: '3', fullName: 'John', role: 'Subcontractor', unitNo: 'All', trades: 'Painter', status: 'Invite Sent' },
  { id: '4', fullName: 'Chicago Prologis', role: 'Strata', unitNo: 'All', trades: 'N/A', status: 'Active' },
  { id: '5', fullName: 'John', role: 'Developer', unitNo: 'All', trades: 'N/A', status: 'Active' },
  { id: '6', fullName: 'John', role: 'Auditor', unitNo: 'All', trades: 'N/A', status: 'Invite Sent' },
  { id: '7', fullName: 'John', role: 'Owner', unitNo: '101', trades: 'N/A', status: 'Active' },
  { id: '8', fullName: 'John', role: 'Owner', unitNo: '102, 103', trades: 'N/A', status: 'Active' },
];

export const ConfigureProject: React.FC = () => {
  const { organizationId, projectId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  const filteredUsers = mockUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === 'Active') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    }
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Invite Sent</Badge>;
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <ProjectSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Projects</span>
              <span>/</span>
              <span>The Atrium</span>
              <span>/</span>
              <span className="text-blue-600">Configure Project</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="information">Project Information</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="settings">Project Settings</TabsTrigger>
            </TabsList>

            {/* Users Tab Content */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  {/* Search and Actions */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search Name, Phone, Email Address..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-80"
                        />
                      </div>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <FilterIcon className="h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        + Invite User
                      </Button>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                            FULL NAME ↕
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                            ROLE ↕
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                            UNIT NO.
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                            TRADES/CATEGORIES ↕
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                            STATUS
                          </th>
                          <th className="w-12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-4 px-4 text-gray-900 dark:text-white">
                              {user.fullName}
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                              {user.role}
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                              {user.unitNo}
                            </td>
                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                              {user.trades}
                            </td>
                            <td className="py-4 px-4">
                              {getStatusBadge(user.status)}
                            </td>
                            <td className="py-4 px-4">
                              <Button variant="ghost" size="sm">
                                <MoreDotIcon className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Showing 1-10 of 1000 Rows: 20 ↕
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        ←
                      </Button>
                      <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <span className="text-gray-500">...</span>
                      <Button variant="outline" size="sm">
                        100
                      </Button>
                      <Button variant="outline" size="sm">
                        →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs content - placeholder */}
            <TabsContent value="information">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Project Information content would go here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Documents content would go here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Project Details content would go here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Contact Details content would go here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Project Settings content would go here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ConfigureProject;
