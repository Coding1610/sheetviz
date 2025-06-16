import React from 'react'
import moment from 'moment'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { deleteData } from '@/helpers/handleDelete'
import { getEnv } from '@/helpers/getEnv'
import { Eye, Trash } from 'lucide-react'
import { showToast } from '@/helpers/showToast'
import { useNavigate } from 'react-router-dom'
import { RouteFileView } from '@/helpers/RouteName'

export default function FileCard({
    fileId,
    name,
    size,
    date,
    fileHeader
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
        <div className="border-2 border-gray-200/80 rounded-lg p-4 hover:border-midRed transition-colors animate-fade-in font-roboto">
            <div className="flex justify-between">
                <div>
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-sm text-gray-500">Uploaded : {moment(date).format('DD-MM-YYYY')}</p>
                    <p className="text-sm text-gray-500">Size : {size}</p>
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
                <div className='flex gap-1'>
                    <Button className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                        <Link to={RouteFileView(fileId)}>
                            <Eye size={16}/>
                        </Link>
                    </Button>
                    <Button onClick={ () => handleDelete(fileId)} className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                        <Link>
                            <Trash size={16}/>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
        </>
    )
}