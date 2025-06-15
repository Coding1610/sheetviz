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
import { useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';
import Loading from '../Loading';
import { useFetch } from '@/hooks/useFtech';
import FileCard from '../FileUpload/FileCard';

const Dashboard = () => {

    const user = useSelector((state) => state.user);

    const [refreshData, setRefreshData] = useState(false);

    const {data:fileData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/uploaded-files/${user?.user?._id}`, {
        method:'get',
        credentials:'include'
    },[refreshData]);
    
    if(loading) return <Loading/>

    return (
        <div className="mx-auto animate-fade-in w-full pl-10 pr-10 font-roboto mt-6 mb-8">
        <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Welcome back, Name</h1>
            <p className="text-gray-500 mt-2">Manage your Excel visualizations and create new insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 staggered-animate">
            <Card className="bg-darkRed text-white pt-3">
                <CardContent className="flex flex-col items-center justify-center h-40">
                    <div className="text-4xl font-bold mb-2">{fileData?.files?.length > 0 ? fileData?.files?.length : 0}</div>
                    <div className="text-lg">Uploaded Files</div>
                </CardContent>
            </Card>

            <Card className="pt-3 border border-gray-200">
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

        {fileData?.files?.length > 0 ? 
            <>
            <div className='flex flex-col gap-4'>

                {fileData.files.map((file,index) => {
                    const fileHeader = file.previewData?.length > 0
                    ?
                    Object.keys(file.previewData[0])
                    : [];
                    
                    return (
                        <>
                            <FileCard 
                                key={file._id || index} 
                                fileId={file._id}
                                name={file.fileName}
                                size={file.size}
                                date={file.createdAt}
                                fileHeader={fileHeader}
                                />
                        </>
                    )
                }) 
                
            }
            </div>
            </>
            :
            <>
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
            </>
        }
        </div>
    );
};

export default Dashboard;