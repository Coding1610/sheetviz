import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FilePlus2, FileX2 } from 'lucide-react';
import { RouteIndex, RouteUploadFile } from '@/helpers/RouteName';
import { useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';
import Loading from '../Loading';
import { useFetch } from '@/hooks/useFtech';
import FileCard from '../FileUpload/FileCard';

const Dashboard = () => {

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const {data:fileData, loading} = useFetch(`${getEnv('VITE_API_BASE_URL')}/uploaded-files/${user?.user?._id}`, {
        method:'get',
        credentials:'include'
    },[]);

    // get user count
    const {data:userCount} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-user-count`, {
        method:'get',
        credentials:'include'
    },[]);

    // get file count
    const {data:fileCount} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-file-count`, {
        method:'get',
        credentials:'include'
    },[]);
    
    // get file storage
    const {data:fileStorage} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-file-storage`, {
        method:'get',
        credentials:'include'
    },[]);

    // get cloudinary storage 
    const {data:cloudinaryStorage} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-cloudinary-storage`, {
        method:'get',
        credentials:'include'
    },[]);

    // console.log(cloudinaryStorage);

    if(loading) return <Loading/>

    return(
        <>

        {user?.isLoggedIn 
        ? 
        <>
        {user?.user?.role === 'User' 
        ?          
        <>
        <div className="mx-auto animate-fade-in w-full px-7 sm:px-14 font-roboto mt-6 mb-8">
        <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Welcome back, {user?.user?.name}</h1>
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

                {fileData.files.slice(0, 2).map((file,index) => {
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
        :
        <>
        <div className="mx-auto animate-fade-in w-full px-7 sm:px-14 font-roboto mt-6 mb-6">
            <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold">Welcome back, {user?.user?.name}</h1>
                <p className="text-gray-500 mt-2">Monitor platform activity, manage users and files, and ensure smooth system operations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 staggered-animate">
                <Card className="flex flex-col justify-center items-center h-[250px] bg-darkRed text-white">
                    <h2 className='text-5xl font-bold'>{userCount?.userCount}</h2>
                    <p className='text-xl'>Total Users</p>
                </Card>
                <Card className="border-dashed border-2 border-darkRed flex flex-col justify-center items-center h-[250px] bg-white text-darkRed">
                    <h2 className='text-5xl font-bold'>{fileCount?.fileCount}</h2>
                    <p className='text-xl'>Total Files</p>
                </Card>
                <Card className="border-dashed border-2 border-darkRed flex flex-col justify-center items-center h-[250px] bg-white text-darkRed">
                <h2 className='text-5xl font-bold'>{fileStorage?.storage?.megabytes}</h2>
                    <p className='text-xl'>File Storage</p>
                </Card>
                <Card className="flex flex-col justify-center items-center h-[250px] bg-darkRed text-white">
                    <h2 className='text-5xl font-bold'>{cloudinaryStorage?.storage?.megabytes} MB</h2>
                    <p className='text-xl'>Cloudinary Storage</p>
                </Card>
            </div>
        </div>
        </>
        }
        </>
        :
        <>
        {navigate('/')}
        </>
        }
        </>
    );
};

export default Dashboard;