import React from 'react'
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import { useSelector } from 'react-redux';
import FileCard from '@/components/FileUpload/FileCard';
import { FilePlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RouteUploadFile } from '@/helpers/RouteName';

export default function UploadedFiles() {


    const user = useSelector((state) => state.user);

    const {data:fileData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/uploaded-files/${user?.user?._id}`, {
        method:'get',
        credentials:'include'
    },[]);
    
    if(loading) return <Loading/>

    return (
        <>
        <div className="mx-auto max-w-5xl animate-fade-in w-full pl-10 pr-10 font-roboto mb-8">
            <div className="mb-8 mt-8">
                <h1 className="text-3xl font-bold">Monitor History</h1>
                <p className="text-gray-600 mt-2">
                    Monitor your file access and deletion activity in real-time
                </p>
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
    </>
  )
}