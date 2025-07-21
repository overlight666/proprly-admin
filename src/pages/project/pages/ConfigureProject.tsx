
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { TextArea } from '@/components/ui/text-area';
import ProjectSidebar from '@/components/project-sidebar';

// Mock project data
const mockProjectData = {
  id: 1,
  name: "The Atrium",
  type: "Apartment",
  status: "Under Development",
  country: "Australia",
  address: "70 Ocean Street, NSW",
  buildingNo: "Enter Building No/Street No",
  password: "AQJH 1298 12849",
  uploadImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=building"
};

const ConfigureProject = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(mockProjectData);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving project data:', formData);
    // Add save logic here
  };

  const handleCancel = () => {
    navigate(-1);
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

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Configure Project
            </h1>

            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Type*
                  </label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange('type', value)}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Townhouse">Townhouse</option>
                  </Select>
                </div>

                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Name*
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>

                {/* Project Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Status*
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <option value="Under Development">Under Development</option>
                    <option value="Planning">Planning</option>
                    <option value="Construction">Construction</option>
                    <option value="Completed">Completed</option>
                  </Select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Country
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => handleInputChange('country', value)}
                  >
                    <option value="Australia">Australia</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </Select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address*
                  </label>
                  <TextArea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>

                {/* Building No/Street No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Building No/Street No
                  </label>
                  <Input
                    type="text"
                    value={formData.buildingNo}
                    onChange={(e) => handleInputChange('buildingNo', e.target.value)}
                    placeholder="Enter Building No/Street No"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password*
                  </label>
                  <Input
                    type="text"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Auto-generated password"
                  />
                </div>

                {/* Upload Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    {formData.uploadImage ? (
                      <div className="relative">
                        <img
                          src={formData.uploadImage}
                          alt="Project"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-white"
                          onClick={() => handleInputChange('uploadImage', '')}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">
                          <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigureProject;
