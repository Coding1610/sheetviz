import React from 'react'
import moment from 'moment'
import { Button } from '../ui/button'
import { deleteData } from '@/helpers/handleDelete'
import { getEnv } from '@/helpers/getEnv'
import { Trash } from 'lucide-react'
import { showToast } from '@/helpers/showToast'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

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
    const [confirmationText, setConfirmationText] = useState('');
    const requiredText = `delete-${name}`;
    const [open, setOpen] = useState(false); // dialog state

    const handleDelete = async () => {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/delete-file/${fileId}`);
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
                        <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                className="rounded-full h-max p-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white"
                                onClick={() => setOpen(true)}
                            >
                                <Trash size={16} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-red-600">Confirm File Deletion</DialogTitle>
                            </DialogHeader>
                            <p className="text-md text-gray-700 mb-2">
                                This action will permanently delete <strong>{name}</strong>.
                                To confirm, type <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">delete-{name}</span> below.
                            </p>
                            <Input
                                className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50"
                                placeholder={`delete-${name}`}
                                value={confirmationText}
                                onChange={(e) => setConfirmationText(e.target.value)}
                            />
                            <div className="flex justify-end mt-4">
                                <Button variant="outline" onClick={() => setOpen(false)} className="mr-2">
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    disabled={confirmationText !== requiredText}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
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