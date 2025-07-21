
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectSidebar from '@/components/project-sidebar';
import TextArea from '@/components/ui/text-area';
import Select from '@/components/ui/select';
import { HiChevronDown, HiBell } from 'react-icons/hi';
import { Dropdown } from 'flowbite-react';

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
  const { organizationId, projectId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(mockProjectData);
  const [activeTab, setActiveTab] = useState('information');

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
      <div className='w-full flex flex-col'>
        <div className="bg-purple-800 text-white h-12 px-4">
          <div className="flex items-center justify-between h-full">
            {/* Left side - Group Dropdown */}
            <div className="flex items-center">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="flex items-center space-x-2 bg-white text-purple-800 px-3 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors font-medium">
                    <span>AXA Group</span>
                    <HiChevronDown className="h-3 w-3" />
                  </div>
                }
              >
                <Dropdown.Item>AXA Group</Dropdown.Item>
                <Dropdown.Item>Other Group</Dropdown.Item>
              </Dropdown>
            </div>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-lg font-semibold tracking-wide">Proprly.</span>
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-3">
              <button className="p-1.5 hover:bg-purple-700 rounded transition-colors">
                <HiBell className="h-5 w-5" />
              </button>
              <button className="p-1.5 hover:bg-purple-700 rounded transition-colors">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-xs text-purple-800 font-medium">U</span>
                </div>
              </button>
              <button className="p-1.5 hover:bg-purple-700 rounded transition-colors">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <span className="text-xs text-purple-800 font-medium">A</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-5 flex-1'>
          <div>
            <ProjectSidebar />
          </div>
          <div className='col-span-4'>
            <div className="flex-1 flex flex-col">
              {/* Top Purple Header */}


              {/* Breadcrumb Section */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>📁</span>
                  <span>Projects</span>
                  <span>/</span>
                  <span>The Atrium</span>
                  <span>/</span>
                  <span className="text-blue-600">Configure Project</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-auto">

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  {/* Custom Tab Navigation */}
                  <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                    <nav className="flex space-x-8">
                      <button
                        onClick={() => setActiveTab('information')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'information'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        Project Information
                      </button>
                      <button
                        onClick={() => setActiveTab('documents')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'documents'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        Documents List
                      </button>
                      <button
                        onClick={() => setActiveTab('details')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'details'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        Project Details
                      </button>
                      <button
                        onClick={() => setActiveTab('users')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'users'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        Assign Users
                      </button>
                      <button
                        onClick={() => setActiveTab('contact')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'contact'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        Contact Details
                      </button>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'settings'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        Project Settings
                      </button>
                    </nav>
                  </div>

                  {/* Project Information Tab */}
                  <TabsContent value="information" className="space-y-6">
                    <Card>
                      <CardContent className="p-8 space-y-8">
                        {/* Project Type */}
                        <div className="space-y-2 w-[50%]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Project Type*
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                            className="w-full h-11 px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          >
                            <option value="">Apartment</option>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Townhouse">Townhouse</option>
                          </select>
                        </div>

                        {/* Project Name */}
                        <div className="space-y-2 w-[50%]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Project Name*
                          </label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="The Atrium"
                            className="w-full"
                          />
                        </div>

                        {/* Project Status */}
                        <div className="space-y-2 w-[50%]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Project Status*
                          </label>
                          <select
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                            className="w-full h-11 px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          >
                            <option value="">Under Security</option>
                            <option value="Under Development">Under Development</option>
                            <option value="Planning">Planning</option>
                            <option value="Construction">Construction</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        {/* Country */}
                        <div className="space-y-2 w-[50%]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Country
                          </label>
                          <select
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="w-full h-11 px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          >
                            <option value="">Select country</option>
                            <option value="Australia">Australia</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>

                        {/* Address - Full Width */}
                        <div className="space-y-2 w-[50%]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Address*
                          </label>
                          <TextArea
                            value={formData.address}
                            onChange={(value) => handleInputChange('address', value)}
                            placeholder="70 Ocean Street, NSW"
                            rows={3}
                            className="w-full resize-none"
                          />
                        </div>

                        {/* Building No/Street No */}
                        <div className="space-y-2 w-[50%]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Building No/Street No
                          </label>
                          <Input
                            type="text"
                            value={formData.buildingNo}
                            onChange={(e) => handleInputChange('buildingNo', e.target.value)}
                            placeholder="Enter Building No/Street No"
                            className="w-full"
                          />
                        </div>

                        {/* Password */}
                        <div className="space-y-2 w-[50%]">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Password*
                          </label>
                          <Input
                            type="text"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="AQJH 1298 12849"
                            className="w-full"
                          />
                        </div>

                        {/* Upload Image */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Upload Image
                          </label>
                          <div className="w-full">
                            {formData.uploadImage ? (
                              <div className="relative inline-block">
                                <img
                                  src={formData.uploadImage}
                                  alt="Project"
                                  className="w-64 h-40 object-cover rounded-lg border border-gray-300"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                                  onClick={() => handleInputChange('uploadImage', '')}
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <div className="w-64 h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                                <div className="text-center">
                                  <div className="text-gray-400 mb-2">
                                    <svg className="mx-auto h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <p className="text-sm text-gray-500">Click to upload</p>
                                  <p className="text-xs text-gray-400">PNG, JPG</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-8 border-t border-gray-200 dark:border-gray-700">
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Documents Tab */}
                  <TabsContent value="documents" className="space-y-6">
                    <Card>
                      <CardContent className="p-6 space-y-8">
                        {/* Project Plan Section */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Project Plan*
                          </h3>

                          {/* Upload Area */}
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 w-[50%]">
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-gray-600 text-white hover:bg-gray-700 border-gray-600"
                              >
                                Choose file
                              </Button>
                              <span className="text-sm text-gray-500">No file chosen</span>
                            </div>
                          </div>

                          {/* Uploaded Files */}
                          <div className="space-y-2  w-[50%]">
                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6H8a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">flowbite-pro-v.2.2.0.pdf</p>
                                  <p className="text-xs text-gray-500">4.1 MB</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6H8a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Project Plan for The Atrium.pdf</p>
                                  <p className="text-xs text-gray-500">8.7 MB</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                                  </div>
                                  <span className="text-xs text-gray-500">76%</span>
                                </div>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Draft Strata Plan Section */}
                        <div className="space-y-4  w-[50%]">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Draft Strata Plan*
                          </h3>

                          {/* Upload Area */}
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-gray-600 text-white hover:bg-gray-700 border-gray-600"
                              >
                                Choose file
                              </Button>
                              <span className="text-sm text-gray-500">No file chosen</span>
                            </div>
                          </div>

                          {/* Uploaded Files */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6H8a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">flowbite-pro-v.2.2.0.pdf</p>
                                  <p className="text-xs text-gray-500">4.1 MB</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6H8a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">General Information.pdf</p>
                                  <p className="text-xs text-gray-500">8.7 MB</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                                  </div>
                                  <span className="text-xs text-gray-500">76%</span>
                                </div>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Miscellaneous Section */}
                        <div className="space-y-4  w-[50%]">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Miscellaneous*
                          </h3>

                          {/* Upload Area */}
                          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-gray-600 text-white hover:bg-gray-700 border-gray-600"
                              >
                                Choose file
                              </Button>
                              <span className="text-sm text-gray-500">No file chosen</span>
                            </div>
                          </div>

                          {/* Uploaded Files */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6H8a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">flowbite-pro-v.2.2.0.pdf</p>
                                  <p className="text-xs text-gray-500">4.1 MB</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6H8a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">General Information.pdf</p>
                                  <p className="text-xs text-gray-500">8.7 MB</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '76%' }}></div>
                                  </div>
                                  <span className="text-xs text-gray-500">76%</span>
                                </div>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-8 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Project Details Tab */}
                  <TabsContent value="details" className="space-y-6">
                    <Card>
                      <CardContent className="p-6 space-y-6">
                        {/* Tower/Basement Configuration - Expanded */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              Tower/Basement Configuration
                            </h3>
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                          </div>

                          {/* Add New Tower Button */}
                          <div className="mb-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 px-4 py-2"
                            >
                              + Add New Tower
                            </Button>
                          </div>

                          {/* Tower Table */}
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                TOWER NAME
                              </div>
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                NO. OF FLOORS
                              </div>
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                STATUS
                              </div>
                            </div>
                            <div className="p-8">
                              <div className="text-center text-gray-500 text-sm">
                                No data available
                              </div>
                            </div>
                          </div>

                          {/* Add Basement Levels Button */}
                          <div className="mt-6 mb-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 px-4 py-2"
                            >
                              + Add Basement Levels
                            </Button>
                          </div>

                          {/* Basement Table */}
                          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                BASEMENT LEVELS
                              </div>
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                STATUS
                              </div>
                            </div>
                            <div className="p-8">
                              <div className="text-center text-gray-500 text-sm">
                                No data available
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Property Configuration - Expanded */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              Property Configuration
                            </h3>
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Property Configuration Content */}
                          <div className="p-6 space-y-6">
                            {/* Enable Toggle */}
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  defaultChecked
                                />
                                <div className="w-12 h-6 bg-blue-600 rounded-full shadow-inner"></div>
                                <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                              </div>
                              <label className="text-sm font-medium text-gray-900 dark:text-white">
                                Enable
                              </label>
                            </div>

                            {/* Search and Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                  </div>
                                  <Input
                                    type="text"
                                    placeholder="Search"
                                    className="pl-10 w-64"
                                  />
                                </div>
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                                >
                                  Search
                                </Button>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Bulk Upload Warranties</span>
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                                >
                                  + Add new property
                                </Button>
                              </div>
                            </div>

                            {/* Properties Table */}
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                              <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                  LOT NO.
                                </div>
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                  UNIT NO.
                                </div>
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                  OWNER NAME ↑
                                </div>
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                  PROPERTY STATUS ↑
                                </div>
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                  LOCATION ↑
                                </div>
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                  WARRANTY STATUS ↑
                                </div>
                              </div>
                              <div className="p-8">
                                <div className="text-center text-gray-500 text-sm">
                                  No properties found
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Common Area Configuration - Expanded */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              Common Area Configuration
                            </h3>
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Common Area Configuration Content */}
                          <div className="p-6 space-y-6">
                            {/* Enable Toggle */}
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  defaultChecked
                                />
                                <div className="w-12 h-6 bg-blue-600 rounded-full shadow-inner"></div>
                                <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                              </div>
                              <label className="text-sm font-medium text-gray-900 dark:text-white">
                                Enable
                              </label>
                            </div>

                            {/* Strata plan no. */}
                            <div className="space-y-2 w-[50%]">
                              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                Strata plan no. *
                              </label>
                              <Input
                                type="text"
                                placeholder="Enter strata plan no."
                                className="w-full"
                              />
                            </div>

                            {/* Configure Common Areas for Tower */}
                            <div className="space-y-4">
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                Configure Common Areas for Tower
                              </h4>
                              
                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    TOWER NAME ↑
                                  </div>
                                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    FLOOR/LEVEL ↑
                                  </div>
                                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    CONFIG STATUS
                                  </div>
                                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    ACTION
                                  </div>
                                </div>
                                
                                {/* Tower A */}
                                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                                  <div className="text-sm text-gray-900 dark:text-white">Tower A</div>
                                  <div className="text-sm text-gray-900 dark:text-white">6</div>
                                  <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Pending
                                    </span>
                                  </div>
                                  <div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                    >
                                      Update
                                    </Button>
                                  </div>
                                </div>

                                {/* Tower B */}
                                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                                  <div className="text-sm text-gray-900 dark:text-white">Tower B</div>
                                  <div className="text-sm text-gray-900 dark:text-white">5</div>
                                  <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Configured
                                    </span>
                                  </div>
                                  <div>
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>

                                {/* Tower C */}
                                <div className="grid grid-cols-4 gap-4 p-4">
                                  <div className="text-sm text-gray-900 dark:text-white">Tower C</div>
                                  <div className="text-sm text-gray-900 dark:text-white">3</div>
                                  <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Pending
                                    </span>
                                  </div>
                                  <div>
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Configure Common Areas for Basement */}
                            <div className="space-y-4">
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                Configure Common Areas for Basement
                              </h4>
                              
                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    BASEMENT LEVELS ↑
                                  </div>
                                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    CONFIG STATUS
                                  </div>
                                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                    ACTION
                                  </div>
                                </div>
                                
                                {/* Basement Level */}
                                <div className="grid grid-cols-3 gap-4 p-4">
                                  <div className="text-sm text-gray-900 dark:text-white">B1, B2, B3</div>
                                  <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Pending
                                    </span>
                                  </div>
                                  <div>
                                    <button className="p-1 hover:bg-gray-100 rounded">
                                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ITP Configuration - Expanded */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              ITP Configuration
                            </h3>
                            <button className="p-2 hover:bg-gray-100 rounded">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* ITP Configuration Content */}
                          <div className="p-6 space-y-6">
                            {/* Enable Toggle */}
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  defaultChecked
                                />
                                <div className="w-12 h-6 bg-blue-600 rounded-full shadow-inner"></div>
                                <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                              </div>
                              <label className="text-sm font-medium text-gray-900 dark:text-white">
                                Enable
                              </label>
                            </div>

                            {/* Select location */}
                            <div className="space-y-2 w-[50%]">
                              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                Select location*
                              </label>
                              <select
                                className="w-full h-11 px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                defaultValue="B1+ Basement"
                              >
                                <option value="B1+ Basement">B1+ Basement</option>
                                <option value="Tower A">Tower A</option>
                                <option value="Tower B">Tower B</option>
                                <option value="Common Areas">Common Areas</option>
                              </select>
                            </div>

                            {/* Trade Section */}
                            <div className="space-y-4">
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                Trade
                              </h4>
                              
                              <div className="grid grid-cols-1 gap-3 max-w-md">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Demolisher</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Excavator</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Scaffolder</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Concreter</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Electrician</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                  <span className="text-sm text-gray-700 dark:text-gray-300">Builder</span>
                                </div>
                              </div>
                            </div>

                            {/* Inspection Test Plans Section */}
                            <div className="space-y-4">
                              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                Inspection Test Plans
                              </h4>
                              
                              <div className="space-y-4">
                                {/* ITP Demolisher */}
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    ITP Demolisher
                                  </span>
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      defaultChecked
                                    />
                                    <div className="w-12 h-6 bg-blue-600 rounded-full shadow-inner"></div>
                                    <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                                  </div>
                                </div>

                                {/* ITP Test (Optional) */}
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    ITP Test (Optional)
                                  </span>
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      defaultChecked
                                    />
                                    <div className="w-12 h-6 bg-blue-600 rounded-full shadow-inner"></div>
                                    <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="outline" className="px-6 py-2">Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Save</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Users Tab */}
                  <TabsContent value="users" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Project Users
                          </h3>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Add User
                          </Button>
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          <p>Manage users who have access to this project.</p>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Contact Details Tab */}
                  <TabsContent value="contact" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Contact Information
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Primary Contact Name
                              </label>
                              <Input placeholder="Enter contact name" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Contact Email
                              </label>
                              <Input type="email" placeholder="Enter contact email" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number
                              </label>
                              <Input type="tel" placeholder="Enter phone number" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Alternative Contact
                              </label>
                              <Input placeholder="Enter alternative contact" />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Project Settings Tab */}
                  <TabsContent value="settings" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Project Settings
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Project Visibility</h4>
                              <p className="text-sm text-gray-500">Control who can see this project</p>
                            </div>
                            <Select defaultValue="private">
                              <option value="private">Private</option>
                              <option value="public">Public</option>
                              <option value="restricted">Restricted</option>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">Notifications</h4>
                              <p className="text-sm text-gray-500">Enable project notifications</p>
                            </div>
                            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
};

export default ConfigureProject;
