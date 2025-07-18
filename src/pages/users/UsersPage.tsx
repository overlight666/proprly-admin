
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useUserActions } from "@/_recoil/actions";
import { useRecoilValue } from "recoil";
import { allUserAtom } from "@/_recoil/states";
import { SearchIcon, PlusIcon, UserIcon } from "@/icons";
import { usePersistor } from "@/helpers/persistor";

export const UsersPage = (): JSX.Element => {
    const [search, setSearch] = useState("");
    const userActions = useUserActions();
    const users = useRecoilValue(allUserAtom);
    const persist = usePersistor();
    const authUser = persist.getValues("authUser");

    useEffect(() => {
        if (authUser?.user?.organizationId) {
            userActions.getAllUsers(authUser.user.organizationId);
        }
    }, []);

    const filteredUsers = users?.filter(user => 
        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.userRole?.roleName?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const getRoleColor = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'project_admin':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'builder':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'developer':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'strata':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'subcontractor':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'salesagent':
                return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
            case 'consultant':
                return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
            case 'auditor':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Users Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Manage users, roles, and permissions
                        </p>
                    </div>
                    <Button className="flex items-center gap-2">
                        <PlusIcon className="w-4 h-4" />
                        Add User
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Input
                                placeholder="Search users by name, email, or role..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                            <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                        <UserIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {user.fullName}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Role:</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.userRole?.roleName)}`}>
                                        {user.userRole?.roleName || 'N/A'}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Mobile:</span>
                                    <span className="text-sm text-gray-900 dark:text-white">
                                        {user.mobileNumber || 'N/A'}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        user.isActive 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}>
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        View
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <Card className="mt-8">
                    <CardContent className="p-12 text-center">
                        <UserIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No users found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {search ? 'Try adjusting your search terms.' : 'Get started by adding your first user.'}
                        </p>
                        {!search && (
                            <Button className="mt-4">
                                Add User
                            </Button>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
