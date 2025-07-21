import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface Project {
  id: string;
  name: string;
  address: string;
  completion: string;
  logo: string;
}

const mockProject: Project = {
  id: '1',
  name: 'The Atrium',
  address: '30 Church Street, NSW 2000, 12 Church St, Brighton',
  completion: '25% Near Warranty',
  logo: '/images/proprly-main.png'
};

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', active: false },
  { id: 'defects', label: 'Defects', active: false },
  { id: 'inspection-test-plans', label: 'Inspection Test Plans', active: false },
  { id: 'calendar', label: 'Calendar', active: false },
  { id: 'reports', label: 'Reports', active: false },
  { id: 'configure-project', label: 'Configure Project', active: false }
];

export const ProjectSidebar: React.FC = () => {
  const { organizationId, projectId } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (itemId: string) => {
    navigate(`/organization/${organizationId}/project/${projectId}/${itemId}`);
  };

  const handleProjectClick = () => {
    navigate('/projects/all');
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleProjectClick}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <span>←</span>
          <span>Projects</span>
        </button>
      </div>

      {/* Project Card */}
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <img
                src={mockProject.logo}
                alt="Project logo"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {mockProject.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {mockProject.address}
                </p>
                <div className="mt-2">
                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                    Project Setup
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {mockProject.completion}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1">
        <ul className="space-y-1 px-4">
          {sidebarItems.map((item) => {
            const isActive = item.id === 'configure-project';
            return (
              <li key={item.id}>
                <Link
                  to={`/organization/${organizationId}/project/${projectId}/${item.id}`}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors block ${isActive
                    ? 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {/* © 2024 Proprly. All rights reserved. */}
        </p>
      </div>
    </div>
  );
};

export default ProjectSidebar;