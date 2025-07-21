
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarSidebarLayout from '@/layouts/navbar-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, GridIcon, ListIcon } from '@/icons';

// Mock data for the project
const mockProject = {
  id: 1,
  name: "The Artisan",
  subtitle: "70 Ocean Drive, NSW",
  location: "Perth, AUSTRALIA",
  status: "Active",
  projectStatus: "11%",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop&crop=center",
  resolvedDefects: 0,
  minorDefects: 0,
  properties: 3,
  openDefects: 6
};

const AllProjects = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}/configure`);
  };

  const handleAddNewProject = () => {
    navigate('/projects/new');
  };

  return (
    <NavbarSidebarLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>📁</span>
            <span>Projects</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Tab Navigation */}
              <div className="flex space-x-6">
                <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-medium">
                  Projects
                </button>
                <button className="text-gray-500 pb-2 font-medium hover:text-gray-700">
                  Appointments
                </button>
                <button className="text-gray-500 pb-2 font-medium hover:text-gray-700">
                  Reports
                </button>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative flex">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pr-10 rounded-r-none border-r-0"
                />
                <Button 
                  variant="outline" 
                  className="rounded-l-none bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
                >
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <GridIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add New Project Button */}
            <Button 
              onClick={handleAddNewProject}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              + Add New Project
            </Button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleProjectClick(mockProject.id)}
            >
              {/* Project Image */}
              <div className="aspect-video relative">
                <img 
                  src={mockProject.image}
                  alt={mockProject.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=Project+Image';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4">
                {/* Project Name and Location */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {mockProject.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {mockProject.subtitle}
                  </p>
                  <p className="text-xs text-gray-400">
                    {mockProject.location}
                  </p>
                </div>

                {/* Project Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Project Status</span>
                    <span className="text-xs text-gray-600">{mockProject.projectStatus}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: mockProject.projectStatus }}
                    ></div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-red-700">Requested Defects: 0</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-green-700">Resolved Defects: 0</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-blue-700">Properties: 5</span>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-yellow-700">Open Defects: 8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Project Card */}
            <div 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleProjectClick(2)}
            >
              {/* Project Image */}
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop&crop=center"
                  alt="Skyline Residences"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200/e5e7eb/6b7280?text=Project+Image';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4">
                {/* Project Name and Location */}
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Skyline Residences
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    125 King Street, VIC
                  </p>
                  <p className="text-xs text-gray-400">
                    Melbourne, AUSTRALIA
                  </p>
                </div>

                {/* Project Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Project Status</span>
                    <span className="text-xs text-gray-600">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>

                {/* Defect Status Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                    Resolved Defects: 12
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Minor Defects: 3
                  </span>
                </div>

                {/* Additional Info */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    Properties: 8
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Open Defects: 2
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <div className="text-center text-sm text-gray-500 py-8">
            © 2024 Proprly. All rights reserved.
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default AllProjects;
