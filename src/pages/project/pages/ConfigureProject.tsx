
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
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Project Documents
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Project Plan*
                            </label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                              <div className="text-center">
                                <p className="text-gray-500">Upload project plan documents</p>
                                <Button variant="outline" className="mt-2">
                                  Choose Files
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Draft Strata Plan*
                            </label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                              <div className="text-center">
                                <p className="text-gray-500">Upload draft strata plan documents</p>
                                <Button variant="outline" className="mt-2">
                                  Choose Files
                                </Button>
                              </div>
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

                  {/* Project Details Tab */}
                  <TabsContent value="details" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Additional Project Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Project Description
                            </label>
                            <TextArea
                              placeholder="Enter project description"
                              rows={4}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Start Date
                              </label>
                              <Input type="date" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Expected Completion
                              </label>
                              <Input type="date" />
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
