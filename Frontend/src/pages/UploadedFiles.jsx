import React from 'react'
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import { useSelector } from 'react-redux';
import FileCard from '@/components/FileUpload/FileCard';
import { FileX2, FilePlus2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { RouteUploadFile } from '@/helpers/RouteName';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
                <FileX2 className='text-center w-full text-darkRed mb-3' size={32}/>
                <h3 className="text-lg font-medium mb-3">No Files Found</h3>
                <p className="text-gray-500 mb-4">You haven’t uploaded any files yet, start by uploading a file to view insights, generate charts, or store your data securely</p>
                <Button className="bg-darkRed hover:bg-midRed rounded-lg">
                    <Link to={RouteUploadFile} className='flex gap-2 justify-center items-center'>
                        <FilePlus2 className='text-white'/>
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