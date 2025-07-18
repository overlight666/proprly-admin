
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarSidebarLayout from '@/layouts/navbar-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Input from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { SearchIcon, FilterIcon, MoreDotIcon } from '@/icons';

interface User {
  id: string;
  fullName: string;
  role: string;
  unitNo: string;
  trades: string;
  status: 'Active' | 'Invite Sent';
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'uploaded' | 'pending';
  progress?: number;
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

const mockDocuments = {
  projectPlan: [
    { id: '1', name: 'floorplan-pro-v.2.2.0.pdf', type: 'pdf', status: 'uploaded' as const },
    { id: '2', name: 'Project Plan for The Atrium.pdf', type: 'pdf', status: 'pending' as const, progress: 75 }
  ],
  draftStatusPlan: [
    { id: '3', name: 'floorplan-pro-v.2.2.0.pdf', type: 'pdf', status: 'uploaded' as const },
    { id: '4', name: 'General Information.pdf', type: 'pdf', status: 'pending' as const, progress: 75 }
  ],
  miscellaneous: [
    { id: '5', name: 'floorplan-pro-v.2.2.0.pdf', type: 'pdf', status: 'uploaded' as const },
    { id: '6', name: 'General Information.pdf', type: 'pdf', status: 'pending' as const, progress: 75 }
  ]
};

export const ConfigureProject: React.FC = () => {
  const { organizationId, projectId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('information');

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

  const renderDocumentSection = (title: string, documents: Document[]) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{title}*</h3>
      <div className="space-y-4">
        <Button variant="outline" className="w-full justify-start text-left">
          Choose file <span className="ml-auto text-gray-500">No file chosen</span>
        </Button>
        
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                <span className="text-red-600 text-xs font-semibold">PDF</span>
              </div>
              <div>
                <p className="font-medium">{doc.name}</p>
                {doc.progress && (
                  <div className="w-48 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {doc.status === 'uploaded' && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              <Button variant="ghost" size="sm">
                <MoreDotIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <NavbarSidebarLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Projects</span>
            <span>/</span>
            <span className="text-blue-600">The Atrium</span>
            <span>/</span>
            <span>Configure Project</span>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(`/organization/${organizationId}/project/view/${projectId}`)}
            className="text-gray-600 border-gray-300"
          >
            Back
          </Button>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="information">Project Information</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="contact">Contact Details</TabsTrigger>
            <TabsTrigger value="settings">Project Settings</TabsTrigger>
          </TabsList>

          {/* Project Information Tab */}
          <TabsContent value="information">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Project Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Name</label>
                    <Input defaultValue="The Atrium" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Code</label>
                    <Input defaultValue="ATR-001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <Input type="date" defaultValue="2024-01-01" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <Input type="date" defaultValue="2024-12-31" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={4}
                      defaultValue="Luxury residential development in downtown area"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Documents</h2>
                
                {renderDocumentSection("Project Plan", mockDocuments.projectPlan)}
                {renderDocumentSection("Draft Status Plan", mockDocuments.draftStatusPlan)}
                {renderDocumentSection("Miscellaneous", mockDocuments.miscellaneous)}

                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Units</label>
                    <Input defaultValue="120" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Total Floors</label>
                    <Input defaultValue="15" type="number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Building Type</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Mixed Use</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Construction Type</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md">
                      <option>New Construction</option>
                      <option>Renovation</option>
                      <option>Addition</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input defaultValue="123 Main Street, Downtown, City" />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Users</h2>
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
                    <Button variant="outline" size="sm">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
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
                          UNIT NO
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                          TRADE CATEGORIES ↕
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
                          <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
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

          {/* Contact Details Tab */}
          <TabsContent value="contact">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Contact Name</label>
                    <Input defaultValue="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Contact Email</label>
                    <Input type="email" defaultValue="john.smith@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Contact Phone</label>
                    <Input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Contact Name</label>
                    <Input defaultValue="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Contact Email</label>
                    <Input type="email" defaultValue="jane.doe@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Secondary Contact Phone</label>
                    <Input type="tel" defaultValue="+1 (555) 987-6543" />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Project Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Enable Notifications</h3>
                      <p className="text-sm text-gray-600">Receive email notifications for project updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Public Project</h3>
                      <p className="text-sm text-gray-600">Make this project visible to all organization members</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Auto-assign Tasks</h3>
                      <p className="text-sm text-gray-600">Automatically assign tasks based on trade categories</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium text-red-600 mb-4">Danger Zone</h3>
                    <div className="p-4 border border-red-200 rounded-lg">
                      <h4 className="font-medium mb-2">Delete Project</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Once you delete a project, there is no going back. Please be certain.
                      </p>
                      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Delete Project
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ConfigureProject;
