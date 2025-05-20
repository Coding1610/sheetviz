
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUserFiles, deleteFile, FileData } from '@/services/FileService';
import { getAllUsers, deleteUser, UserData, createOrUpdateUser } from '@/services/UserService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  User, Files, FileText, Trash2, Users, 
  UserCog, BarChart3
} from 'lucide-react';

const Admin = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [usersList, setUsersList] = useState<UserData[]>([]);
  const [filesList, setFilesList] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFiles: 0
  });
  
  useEffect(() => {
    // Check if user is logged in 
    if (isLoaded) {
      if (!isSignedIn) {
        toast.error('Please sign in to access the admin panel');
        navigate('/sign-in');
        return;
      }
      
      // User is signed in, register them as admin
      if (user) {
        createOrUpdateUser({
          id: user.id,
          name: user.fullName || 'Admin User',
          email: user.primaryEmailAddress?.emailAddress || '',
          imageUrl: user.imageUrl || '',
          role: 'admin',
          createdAt: new Date().toISOString().split('T')[0]
        });
        
        loadData();
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load users and files
      const users = await getAllUsers();
      const files = await getUserFiles('all'); // Get all files
      
      setUsersList(users);
      setFilesList(files);
      
      setStats({
        totalUsers: users.length,
        totalFiles: files.length
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Error loading admin data');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteUser = async (userId: string) => {
    try {
      const success = await deleteUser(userId);
      if (success) {
        toast.success('User deleted successfully');
        setUsersList(usersList.filter(u => u.id !== userId));
        setStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers - 1
        }));
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };
  
  const handleDeleteFile = async (fileId: number) => {
    try {
      const success = await deleteFile(fileId, 'admin');
      if (success) {
        toast.success('File deleted successfully');
        setFilesList(filesList.filter(f => f.id !== fileId));
        setStats(prev => ({
          ...prev,
          totalFiles: prev.totalFiles - 1
        }));
      } else {
        toast.error('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Error deleting file');
    }
  };
  
  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-brand-purple border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-brand-purple-soft rounded-lg">
              <UserCog className="h-6 w-6 text-brand-purple" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {user?.fullName || 'Admin User'}
                </span>
              </div>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-sm"
          >
            Home
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => loadData()}
            className="text-sm"
          >
            Refresh Data
          </Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="h-5 w-5 mr-2 text-brand-purple" />
                Total Users
              </CardTitle>
              <CardDescription>Number of registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Files className="h-5 w-5 mr-2 text-brand-purple" />
                Total Files
              </CardTitle>
              <CardDescription>Number of uploaded files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalFiles}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Users and Files */}
        <Tabs defaultValue="users" className="mb-8">
          <TabsList>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center">
              <Files className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        usersList.map((userData) => (
                          <TableRow key={userData.id}>
                            <TableCell className="font-medium flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={userData.imageUrl} alt={userData.name} />
                                <AvatarFallback>{userData.name?.charAt(0) || 'U'}</AvatarFallback>
                              </Avatar>
                              <span>{userData.name}</span>
                            </TableCell>
                            <TableCell>{userData.email}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                userData.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {userData.role}
                              </span>
                            </TableCell>
                            <TableCell>{userData.createdAt}</TableCell>
                            <TableCell>
                              {userData.role !== 'admin' && (
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteUser(userData.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {!isMobile && <span className="ml-1">Delete</span>}
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>File Management</CardTitle>
                <CardDescription>Manage uploaded files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File Name</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date Uploaded</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Chart Type</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filesList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No files found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filesList.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell className="font-medium flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span>{file.name}</span>
                            </TableCell>
                            <TableCell>{file.userId}</TableCell>
                            <TableCell>{file.uploadedDate}</TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>{file.chartType}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/visualization/${file.id}`)}
                                >
                                  <BarChart3 className="h-4 w-4" />
                                  {!isMobile && <span className="ml-1">View</span>}
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteFile(file.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  {!isMobile && <span className="ml-1">Delete</span>}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;