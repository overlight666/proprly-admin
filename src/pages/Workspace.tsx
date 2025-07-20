
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Project {
  id: string;
  name: string;
  address: string;
  location: string;
  imageUrl: string;
  progress: number;
  dueDate: string;
  properties: string;
  commonAreas: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'The Atrium',
    address: '25 Church Street West',
    location: 'Toronto, Ontario',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop&crop=building',
    progress: 75,
    dueDate: '2024-12-15',
    properties: '5',
    commonAreas: '3'
  },
  {
    id: '2', 
    name: 'The Heights',
    address: '123 Main Street',
    location: 'Vancouver, BC',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop&crop=building',
    progress: 60,
    dueDate: '2024-11-30',
    properties: '8',
    commonAreas: '4'
  }
];

const Workspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}/configure`);
  };

  const handleAddProject = () => {
    navigate('/projects/new');
  };

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="text-xl font-bold text-blue-600">Proprly.</div>
          </div>
          
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md"
            >
              Projects
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-indigo-900 text-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-xl font-bold">Proprly.</div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-md px-3 py-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent border-none outline-none text-white placeholder-white placeholder-opacity-70 text-sm"
                    style={{ width: '120px' }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5M4 17h5l-5-5 5-5" />
                </svg>
              </button>
              
              {/* Profile Icon */}
              <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-blue-600">Projects</span>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-gray-100">
                <TabsTrigger 
                  value="projects" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger 
                  value="archived"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Archived
                </TabsTrigger>
                <TabsTrigger 
                  value="draft"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
              </TabsList>

              <Button 
                onClick={handleAddProject}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                Add New Project
              </Button>
            </div>

            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 bg-blue-50 border-blue-300">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Name</option>
                  <option>Date Created</option>
                  <option>Status</option>
                </select>
              </div>
            </div>

            <TabsContent value="projects" className="space-y-6">
              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-lg overflow-hidden bg-white"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <CardContent className="p-0">
                      {/* Project Image */}
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop&crop=building';
                          }}
                        />
                      </div>
                      
                      {/* Project Details */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 text-lg">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          {project.address}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {project.location}
                        </p>
                        
                        {/* Status Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800">
                            Properties: {project.properties}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                            Common Areas: {project.commonAreas}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No projects found</div>
                  <p className="text-gray-500 text-sm">
                    {searchQuery ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Other tab contents */}
            <TabsContent value="archived">
              <div className="text-center py-12 text-gray-500">
                Archived projects will appear here
              </div>
            </TabsContent>
            
            <TabsContent value="draft">
              <div className="text-center py-12 text-gray-500">
                Draft projects will appear here
              </div>
            </TabsContent>
            
            <TabsContent value="all">
              <div className="text-center py-12 text-gray-500">
                All projects will appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="text-center text-xs text-gray-500">
            © 2024 Proprly. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
