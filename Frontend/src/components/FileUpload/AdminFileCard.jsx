import React from 'react'
import moment from 'moment'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { deleteData } from '@/helpers/handleDelete'
import { getEnv } from '@/helpers/getEnv'
import { Trash } from 'lucide-react'
import { showToast } from '@/helpers/showToast'
import { useNavigate } from 'react-router-dom'

export default function AdminFileCard({
    fileId,
    name,
    size,
    date,
    fileHeader,
    author,
    avatar
}){

    const navigate = useNavigate();

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_API_BASE_URL')}/delete-file/${id}`);
        if(response){
            navigate(0);
        }
        else{
            showToast('Error','Error while deleting File');
        }
    };

    return (
        <>
        <div className="bg-white border-2 border-gray-200/80 rounded-lg p-4 hover:border-midRed transition-colors animate-fade-in font-roboto">
            <div className="flex justify-between">
                <div className='w-full'>
                    <div className="flex items-center justify-between gap-2">
                        <div className='flex items-center gap-2'>
                            <img
                                src={avatar ? avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${author}%20`} 
                                alt={author}
                                className="w-8 h-8 rounded-full object-cover"
                                />
                            <span className="text-[15px] font-semibold text-black">{author}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button onClick={ () => handleDelete(fileId)} className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                <Link>
                                    <Trash size={16}/>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <p className='border my-2'></p>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm text-gray-700">Uploaded : {moment(date).format('DD-MM-YYYY')}</p>
                    <p className="text-sm text-gray-700">Size : {size}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {fileHeader.map((th,idx) => (
                            <span 
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1"
                            >
                            {th}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}