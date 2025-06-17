import React from 'react'
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import AdminFileCard from '@/components/FileUpload/AdminFileCard';
import { FileX2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function GetAllFiles() {

    const {data:fileData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-all-files`, {
        method:'get',
        credentials:'include'
    },[]);

    console.log(fileData);
    
    if(loading) return <Loading/>

    return (
        <>
        <div className="mx-auto max-w-5xl animate-fade-in w-full pl-10 pr-10 font-roboto mb-8">
            <div className="mb-8 mt-8">
                <h1 className="text-3xl font-bold">File Management</h1>
                <p className="text-gray-600 mt-2">
                  Access and manage all files uploaded by users. You can delete files to maintain system integrity.
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
                            <AdminFileCard 
                                key={file._id || index} 
                                fileId={file._id}
                                name={file.fileName}
                                size={file.size}
                                date={file.createdAt}
                                fileHeader={fileHeader}
                                author={file.author?.name}
                                avatar={file.author?.avatar}
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
                <p className="text-gray-500">View and manage all files uploaded by users across the platform. You can delete any file from here.</p>
            </Card>
            </>
        }
        </div>
    </>
  )
}