
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
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-purple-800">
        <button
          onClick={handleProjectClick}
          className="flex items-center space-x-2 text-sm text-white hover:text-gray-200 transition-colors w-full"
        >
          <span>▶</span>
          <span className="font-medium">Projects</span>
        </button>
      </div>

      {/* Project Card */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600 font-medium">
              1
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                The Atrium
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                30 Church Street, NSW
                <br />
                2000, 12 Church St, Brighton
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                Under Warranty
              </p>
              <div className="mt-2">
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                  Project Setup
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  25%
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Image */}
          <div className="mt-3">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop&crop=building"
              alt="Project"
              className="w-full h-20 object-cover rounded"
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 bg-gray-100 dark:bg-gray-900">
        <ul className="space-y-0">
          {sidebarItems.map((item) => {
            const isActive = window.location.pathname.includes(item.id);
            return (
              <li key={item.id}>
                <Link
                  to={`/organization/${organizationId}/project/${projectId}/${item.id}`}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-b border-gray-200 dark:border-gray-700 block ${
                    isActive
                      ? 'bg-purple-800 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ProjectSidebar;
