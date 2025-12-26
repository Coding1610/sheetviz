import React from 'react';
import { Card } from '@/components/ui/card';
import { useFetch } from '@/hooks/useFtech';
import { getEnv } from '@/helpers/getEnv';

const AdminStats = () => {
    const apiBase = getEnv('VITE_API_BASE_URL');
    const fetchOptions = { method: 'get', credentials: 'include' };

    // These hooks ONLY run when an Admin is logged in and this component renders
    const { data: userCount } = useFetch(`${apiBase}/get-user-count`, fetchOptions, []);
    const { data: fileCount } = useFetch(`${apiBase}/get-file-count`, fetchOptions, []);
    const { data: fileStorage } = useFetch(`${apiBase}/get-file-storage`, fetchOptions, []);
    const { data: cloudinaryStorage } = useFetch(`${apiBase}/get-cloudinary-storage`, fetchOptions, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 staggered-animate">
            <Card className="flex flex-col justify-center items-center h-[250px] bg-darkRed text-white">
                <h2 className='sm:text-5xl text-2xl text-center font-bold'>{userCount?.userCount || 0}</h2>
                <p className='text-xl text-center'>Total Users</p>
            </Card>
            <Card className="border-dashed border-2 border-darkRed flex flex-col justify-center items-center h-[250px] bg-white text-darkRed">
                <h2 className='sm:text-5xl text-2xl text-center font-bold'>{fileCount?.fileCount || 0}</h2>
                <p className='text-xl text-center'>Total Files</p>
            </Card>
            <Card className="border-dashed border-2 border-darkRed flex flex-col justify-center items-center h-[250px] bg-white text-darkRed">
                <h2 className='sm:text-5xl text-2xl text-center font-bold'>{fileStorage?.storage?.megabytes || 0}</h2>
                <p className='text-xl text-center'>File Storage (MB)</p>
            </Card>
            <Card className="flex flex-col justify-center items-center h-[250px] bg-darkRed text-white">
                <h2 className='font-bold sm:text-5xl text-2xl text-center'>{cloudinaryStorage?.storage?.megabytes || 0} MB</h2>
                <p className='text-xl text-center'>Cloudinary Storage</p>
            </Card>
        </div>
    );
};

export default AdminStats;