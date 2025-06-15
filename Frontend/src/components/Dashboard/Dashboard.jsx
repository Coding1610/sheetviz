import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Upload, FilePlus } from 'lucide-react';
import { RouteUploadFile } from '@/helpers/RouteName';

const Dashboard = () => {
//   const { user, isLoaded } = useUser();
//   const firstName = user?.firstName || 'there';
  const [fileHistory, setFileHistory] = useState([]);

//   useEffect(() => {
//     if (isLoaded && user) {
//       const files = getUserFiles(user.id);
//       setFileHistory(files);
//     }
//   }, [isLoaded, user]);

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const handleDeleteFile = (fileId) => {
//     if (user) {
//       const success = deleteFile(fileId, user.id);
//       if (success) {
//         setFileHistory(prevFiles => prevFiles.filter(file => file.id !== fileId));
//         toast.success('File deleted successfully');
//       } else {
//         toast.error('Failed to delete file');
//       }
//     }
//   };

    return (
        <div className="mx-auto animate-fade-in w-full pl-10 pr-10 font-roboto mt-6 mb-8">
        <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Welcome back, Name</h1>
            <p className="text-gray-500 mt-2">Manage your Excel visualizations and create new insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 staggered-animate">
            <Card className="bg-darkRed text-white">
            <CardContent className="flex flex-col items-center justify-center h-40">
                <div className="text-4xl font-bold mb-2">0</div>
                <div className="text-lg">Uploaded Files</div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="flex flex-col items-center justify-center h-40">
                <div className="text-4xl font-bold mb-2 text-darkRed">7</div>
                <div className="text-lg text-gray-700">Different Chart Types</div>
            </CardContent>
            </Card>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between md:items-center mb-8 animate-fade-in gap-3 md:gap-0">
            <h2 className="text-2xl font-bold">Your Recent Files</h2>
            <Button asChild className="bg-darkRed hover:bg-midRed rounded-lg">
                <Link to={RouteUploadFile} className="text-white font-roboto">
                <Upload className="text-white" />
                    Upload New File
                </Link>
            </Button>
        </div>

            <Card className="p-8 text-center">
                <div className="text-gray-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M12 18v-6"></path>
                    <path d="M9 15h6"></path>
                </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No files yet</h3>
                <p className="text-gray-500 mb-6">Upload your first Excel file to start visualizing data</p>
                <Button asChild className="bg-darkRed hover:bg-midRed rounded-lg">
                    <Link to={RouteUploadFile} className="text-white font-roboto">
                    <FilePlus className="text-white" />
                        Upload First File
                    </Link>
                </Button>
            </Card>

        {/* <div className="mb-8">
            {fileHistory.length > 0 ? (
            <div className="grid gap-4 staggered-animate">
                {fileHistory.map((file) => (
                <Card key={file.id} className="overflow-hidden card-hover">
                    <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="bg-darkRed-soft p-4 md:p-6 md:w-16 md:h-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-darkRed">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <line x1="10" y1="9" x2="8" y2="9"></line>
                        </svg>
                        </div>

                        <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                            <h3 className="font-medium text-lg text-gray-900">{file.name}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-sm text-gray-600">
                                <span>Uploaded: {formatDate(file.uploadedDate)}</span>
                                <span className="hidden md:inline-block">•</span>
                                <span>{file.size}</span>
                                <span className="hidden md:inline-block">•</span>
                                <span>{file.chartType}</span>
                            </div>
                            <div className="mt-2 flex items-center flex-wrap gap-2">
                                {file.columns.map((column, i) => (
                                <span key={i} className="bg-darkRed-soft/30 text-darkRed-700 text-xs px-2 py-1 rounded-full">
                                    {column}
                                </span>
                                ))}
                            </div>
                            </div>

                            <div className="flex gap-2">
                            <Link to={`/visualization/${file.id}`}>
                                <Button size="sm" className="bg-darkRed hover:bg-darkRed-600">
                                View Analysis
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="border-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                    <circle cx="12" cy="12" r="1"></circle>
                                    <circle cx="12" cy="5" r="1"></circle>
                                    <circle cx="12" cy="19" r="1"></circle>
                                    </svg>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={() => handleDeleteFile(file.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                    Delete File
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </div>
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            ) : (
            <Card className="p-8 text-center">
                <div className="text-gray-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="M12 18v-6"></path>
                    <path d="M9 15h6"></path>
                </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No files yet</h3>
                <p className="text-gray-500 mb-6">Upload your first Excel file to start visualizing data</p>
                <Link to="/upload" className="inline-block">
                <Button className="bg-darkRed hover:bg-darkRed-600">Upload First File</Button>
                </Link>
            </Card>
            )}
        </div> */}
        </div>
    );
};

export default Dashboard;