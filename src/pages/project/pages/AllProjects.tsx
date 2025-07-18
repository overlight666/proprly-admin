
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarSidebarLayout from '@/layouts/navbar-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Input from '@/components/ui/input';
import { SearchIcon, FilterIcon, MoreDotIcon, GridIcon, OrderedListIcon } from '@/icons';

interface Project {
  id: string;
  name: string;
  invitedBy: string;
  dateCreated: string;
  roleType: string;
  status: 'Rejected' | 'Pending';
}

const mockProjects: Project[] = [
  { id: '1', name: 'The Atrium', invitedBy: 'Chris Hua', dateCreated: '12-06-2025', roleType: 'Builder', status: 'Rejected' },
  { id: '2', name: 'Project#1', invitedBy: 'Justin', dateCreated: '12-06-2025', roleType: 'Sales Agent', status: 'Pending' },
  { id: '3', name: 'Project#2', invitedBy: 'Justin', dateCreated: '12-06-2025', roleType: 'Subcontractor', status: 'Pending' },
  { id: '4', name: 'Project#2', invitedBy: 'Justin', dateCreated: '12-06-2025', roleType: 'Strata', status: 'Pending' },
  { id: '5', name: 'Project#2', invitedBy: 'Justin', dateCreated: '12-06-2025', roleType: 'Developer', status: 'Pending' },
  { id: '6', name: 'Project#2', invitedBy: 'Justin', dateCreated: '12-06-2025', roleType: 'Auditor', status: 'Pending' },
  { id: '7', name: 'Project#3', invitedBy: 'Justin', dateCreated: '12-06-2025', roleType: 'Auditor', status: 'Pending' },
  { id: '8', name: 'Project#4', invitedBy: 'Justin', dateCreated: '12-06-2025', roleType: 'Auditor', status: 'Pending' },
];

export const AllProjects: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.invitedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === 'Rejected') {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pending</Badge>;
  };

  return (
    <NavbarSidebarLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Projects</span>
            <span>/</span>
            <span className="text-blue-600">All Project</span>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="text-gray-600 border-gray-300"
          >
            Back
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Title and Search */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Projects</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <OrderedListIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add New Project
                </Button>
                <Button variant="outline" className="text-blue-600 border-blue-600">
                  Add New Project
                </Button>
              </div>
            </div>

            {viewMode === 'list' && (
              <>
                {/* Projects Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                          PROJECTS ↕
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                          INVITED BY ↕
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                          DATE CREATED ↕
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                          ROLE TYPE ↕
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                          STATUS
                        </th>
                        <th className="w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td 
                            className="py-4 px-4 text-blue-600 font-medium cursor-pointer"
                            onClick={() => navigate(`/organization/1/project/${project.id}/configure`)}
                          >
                            {project.name}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                            {project.invitedBy}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                            {project.dateCreated}
                          </td>
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                            {project.roleType}
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(project.status)}
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
                    Showing 1 of 10000 Rows: 20 ↕
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
              </>
            )}

            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/organization/1/project/${project.id}/configure`)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 text-blue-600">{project.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">Invited by: {project.invitedBy}</p>
                      <p className="text-sm text-gray-600 mb-1">Created: {project.dateCreated}</p>
                      <p className="text-sm text-gray-600 mb-3">Role: {project.roleType}</p>
                      {getStatusBadge(project.status)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </NavbarSidebarLayout>
  );
};

export default AllProjects;
