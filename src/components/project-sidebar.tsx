import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();

  const handleProjectClick = () => {
    navigate('/projects/all');
  };

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-sm border-r border-gray-200" style={{ paddingTop: '48px' }}>
      {/* Projects Section */}
      <div className="p-0">
        <button
          onClick={handleProjectClick}
          className="flex items-center space-x-2 text-gray-700 hover:text-purple-700 transition-colors w-full text-left group px-4 py-3 border-b border-gray-100"
        >
          <span className="text-xs transform group-hover:rotate-90 transition-transform duration-200">▶</span>
          <span className="font-medium text-sm">Projects</span>
        </button>

        {/* The Atrium Project */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center space-x-3 pl-4">
            <span className="text-xs text-gray-400">T</span>
            <div className="flex-1">
              <h2 className="font-medium text-sm text-gray-900">The Atrium</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Card */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {/* Project Header */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              The Atrium
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              70 Church Street, NSW<br />
              2000, 12 Church St, Brighton
            </p>
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                Under Warranty
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">Project Setup</span>
              <span className="text-xs font-semibold text-blue-600">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: '25%' }}
              ></div>
            </div>
          </div>

          {/* Project Image */}
          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=100&fit=crop&crop=building"
              alt="The Atrium Project"
              className="w-full h-20 object-cover rounded border border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 bg-white">
        <ul className="space-y-0">
          {sidebarItems.map((item) => {
            const isActive = location.pathname.includes(item.id);
            return (
              <li key={item.id}>
                <Link
                  to={`/organization/${organizationId}/project/${projectId}/${item.id}`}
                  className={`
                    w-full text-left px-4 py-3 text-sm transition-all duration-200 
                    border-b border-gray-50 block group hover:bg-gray-50
                    ${isActive
                      ? 'bg-purple-50 text-purple-700 font-medium border-r-3 border-r-purple-600'
                      : 'text-gray-700 hover:text-gray-900'
                    }
                  `}
                >
                  <span className={`${isActive ? 'font-medium' : 'font-normal'}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-center space-x-3">
          <button 
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors group"
            title="Settings"
          >
            <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button 
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors group"
            title="Help"
          >
            <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSidebar;