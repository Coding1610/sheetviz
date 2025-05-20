
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Navbar from '@/components/LandingPage/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Sample data for uploaded files (in a real app, this would come from your backend)
const SAMPLE_FILES = [
  {
    id: '1',
    name: 'Sales Report 2024.xlsx',
    uploadedAt: '2024-04-15T10:30:00Z',
    size: '245 KB',
    columns: ['Month', 'Sales', 'Expenses', 'Profit']
  },
  {
    id: '2',
    name: 'Marketing Campaign Results.xlsx',
    uploadedAt: '2024-04-10T14:22:00Z',
    size: '198 KB',
    columns: ['Campaign', 'Impressions', 'Clicks', 'Conversions', 'Cost']
  },
  {
    id: '3',
    name: 'Employee Performance Q1.xlsx',
    uploadedAt: '2024-03-31T09:15:00Z',
    size: '320 KB',
    columns: ['Employee', 'Department', 'Goals Met', 'Rating']
  }
];

const Profile = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState(SAMPLE_FILES);
  
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error('Please sign in to view your profile');
      navigate('/sign-in');
    }
  }, [isSignedIn, isLoaded, navigate]);
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
    </div>;
  }
  
  if (!isSignedIn) {
    return null; // Will redirect in useEffect
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and view your uploaded files</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-medium">{user?.fullName || 'User'}</h3>
                    <p className="text-gray-500">{user?.primaryEmailAddress?.emailAddress || ''}</p>
                  </div>
                  <div className="w-full pt-4 border-t border-gray-200 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span>{user?.primaryEmailAddress?.emailAddress || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">First Name</span>
                        <span>{user?.firstName || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Name</span>
                        <span>{user?.lastName || 'Not provided'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created</span>
                        <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="files" className="w-full">
              <TabsList className="mb-6 bg-white">
                <TabsTrigger value="files">Uploaded Files</TabsTrigger>
                <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="files" className="mt-0">
                <Card className="shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Your Uploaded Files</CardTitle>
                      <Button 
                        className="bg-brand-purple hover:bg-brand-purple-600"
                        onClick={() => navigate('/upload')}
                      >
                        Upload New File
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {uploadedFiles.length > 0 ? (
                      <div className="space-y-4">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="border rounded-lg p-4 hover:border-brand-purple transition-colors animate-fade-in">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{file.name}</h3>
                                <p className="text-sm text-gray-500">Uploaded: {formatDate(file.uploadedAt)}</p>
                                <p className="text-sm text-gray-500">Size: {file.size}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {file.columns.map((col, idx) => (
                                    <span 
                                      key={idx}
                                      className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1"
                                    >
                                      {col}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2 items-start">
                                <Button 
                                  variant="outline" 
                                  className="text-brand-purple border-brand-purple"
                                  onClick={() => navigate(`/visualization/${file.id}`)}
                                >
                                  View Analysis
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">You haven't uploaded any files yet.</p>
                        <Button 
                          className="mt-4 bg-brand-purple hover:bg-brand-purple-600"
                          onClick={() => navigate('/upload')}
                        >
                          Upload Your First File
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="visualizations" className="mt-0">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Your Visualizations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uploadedFiles.map((file) => (
                        <Card key={file.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer animate-fade-in">
                          <div 
                            className="aspect-video bg-gray-100 flex items-center justify-center"
                            onClick={() => navigate(`/visualization/${file.id}`)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                              <rect width="18" height="18" x="3" y="3" rx="2" />
                              <path d="M3 9h18" />
                              <path d="M9 21V9" />
                            </svg>
                          </div>
                          <CardContent className="p-3">
                            <h3 className="font-medium text-sm truncate">{file.name}</h3>
                            <p className="text-xs text-gray-500">{formatDate(file.uploadedAt)}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
