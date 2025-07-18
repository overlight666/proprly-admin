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
  const { organizationId, projectId, id } = useParams();
  const navigate = useNavigate();

  // Handle both route patterns
  const currentProjectId = projectId || id;
  const currentOrgId = organizationId;

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
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectSidebar from '@/components/project-sidebar';

interface Document {
  id: string;
  name: string;
  size: string;
  uploaded: boolean;
  progress?: number;
}

const mockDocuments: { [key: string]: Document[] } = {
  'project-plan': [
    { id: '1', name: 'flowbite-pro-v.2.2.0.pdf', size: '12.4 MB', uploaded: true },
    { id: '2', name: 'Project Plan for The Atrium.pdf', size: '8.7 MB', uploaded: false, progress: 76 }
  ],
  'draft-strata-plan': [
    { id: '3', name: 'flowbite-pro-v.2.2.0.pdf', size: '12.4 MB', uploaded: true },
    { id: '4', name: 'General Information.pdf', size: '8.7 MB', uploaded: false, progress: 76 }
  ],
  'miscellaneous': [
    { id: '5', name: 'flowbite-pro-v.2.2.0.pdf', size: '12.4 MB', uploaded: true },
    { id: '6', name: 'General Information.pdf', size: '8.7 MB', uploaded: false, progress: 76 }
  ]
};

export const DocumentsPage: React.FC = () => {
  const { organizationId, projectId, id } = useParams();
  const navigate = useNavigate();

  // Handle both route patterns
  const currentProjectId = projectId || id;
  const currentOrgId = organizationId;

  const handleFileUpload = (category: string) => {
    // Handle file upload logic
    console.log(`Upload file for ${category}`);
  };

  const renderDocumentSection = (title: string, category: string) => {
    const documents = mockDocuments[category] || [];

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
          <div className="text-center mb-4">
            <Button
              onClick={() => handleFileUpload(category)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Choose file
            </Button>
            <p className="text-sm text-gray-500 mt-2">No file chosen</p>
          </div>

          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-red-600 text-xs font-bold">PDF</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {doc.uploaded ? (
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full" 
                        style={{ width: `${doc.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{doc.progress}%</span>
                    <button className="text-gray-400 hover:text-red-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  {renderDocumentSection('Project Plan*', 'project-plan')}
                  {renderDocumentSection('Draft Strata Plan*', 'draft-strata-plan')}
                  {renderDocumentSection('Miscellaneous*', 'miscellaneous')}

                  <div className="flex justify-end space-x-4 mt-8">
                    <Button variant="outline">
                      Cancel
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tab contents - placeholder */}
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
      </div>
    </div>
  );
};

export default DocumentsPage;