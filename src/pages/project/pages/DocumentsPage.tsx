
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarSidebarLayout from '@/layouts/navbar-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PDFIcon } from '@/icons';

interface Document {
  id: string;
  name: string;
  size: string;
  progress?: number;
  category: 'project' | 'draft' | 'miscellaneous';
}

const mockDocuments: Document[] = [
  { id: '1', name: 'flowbite-pro-v.2.2.0.pdf', size: '32 MB', category: 'project' },
  { id: '2', name: 'Project Plan for The Atrium.pdf', size: '41.5 MB', progress: 75, category: 'project' },
  { id: '3', name: 'flowbite-pro-v.2.2.0.pdf', size: '32 MB', category: 'draft' },
  { id: '4', name: 'General Information.pdf', size: '41.5 MB', progress: 75, category: 'draft' },
  { id: '5', name: 'flowbite-pro-v.2.2.0.pdf', size: '32 MB', category: 'miscellaneous' },
  { id: '6', name: 'General Information.pdf', size: '41.5 MB', progress: 75, category: 'miscellaneous' },
];

export const DocumentsPage: React.FC = () => {
  const { organizationId, projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('documents');

  const DocumentSection = ({ title, category }: { title: string; category: string }) => {
    const categoryDocs = mockDocuments.filter(doc => doc.category === category);
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}*</h3>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 mb-4 text-center">
          <Button className="bg-gray-600 hover:bg-gray-700 text-white mb-2">
            Choose file
          </Button>
          <p className="text-gray-500 text-sm">No file chosen</p>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {categoryDocs.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <PDFIcon className="h-6 w-6 text-red-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {doc.progress && (
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${doc.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{doc.progress}%</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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

          {/* Documents Tab Content */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <DocumentSection title="Project Plan" category="project" />
                <DocumentSection title="Draft Status Plan" category="draft" />
                <DocumentSection title="Miscellaneous" category="miscellaneous" />
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mt-8">
                  <Button className="bg-gray-600 hover:bg-gray-700">
                    Save
                  </Button>
                  <Button variant="outline" className="text-gray-600 border-gray-300">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs - placeholder */}
          <TabsContent value="information">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Project Information content would go here...</p>
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

          <TabsContent value="users">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Users content would go here...</p>
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
    </NavbarSidebarLayout>
  );
};

export default DocumentsPage;
