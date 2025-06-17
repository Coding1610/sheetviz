import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFetch } from '@/hooks/useFtech'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { Trash, UserRoundX } from 'lucide-react'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useSelector } from 'react-redux'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from '@/components/ui/input'
 
export default function GetAllUsers() {

    const [refreshData, setRefreshData] = useState(false);

    const [confirmationText, setConfirmationText] = useState('');
    const requiredText = `delete-${name}`;
    const [open, setOpen] = useState(false); // dialog state

    const user = useSelector((state) => state.user);

    const {data:userData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-all-users`, {
        method:'get',
        credentials:'include'
    },[refreshData]);
    
    const usersArray = userData?.allUsers || [];

    const users = [...usersArray].reverse();

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`);
        if(response){
            setRefreshData(!refreshData);
            showToast('Success','User Deleted Successfully');
        }
        else{
            showToast('Error','Error while deleting user');
        }
    };

    if(loading) return <Loading/>

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mb-4'>
                <div className="mb-8 mt-8 ml-5">
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-gray-600 mt-2">
                    Stay in control of your users and easily manage them
                    </p>
                </div>

                { userData && userData?.allUsers.length > 1 ?
                <>
                <Card className='mx-4 px-2 pt-2'>
                    <Table>
                        <TableHeader className="text-darkRed">
                            <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                                <TableHead className="text-darkRed text-[15px]">Role</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Name</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Email</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Avatar</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Dated</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Action</TableHead>
                                </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userData && userData?.allUsers.length > 0   
                                &&
                            users.map(u => 
                                <>
                                <TableRow key={u?._id} className={`${u?.role === 'Admin' ? 'bg-darkRed/30' : 'bg-none'} text-nowrap`}>
                                    <TableCell>{u?.role}</TableCell>
                                    <TableCell>{u?.name}</TableCell>
                                    <TableCell>{u?.email}</TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage className='w-8 h-8 rounded-full' src={u?.avatar ? u.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${u?.name}%20`} />
                                            <AvatarFallback>PP</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{u?.createdAt ? moment(u?.createdAt).format('DD-MM-YYYY') : '_'}</TableCell>
                                    <TableCell className="flex items-center">
                                        {/* <Button onClick={() => handleDelete(u?._id)} className={` ${u?.role === 'Admin' ? 'hidden bg-darkRed/30' : 'bg-white' } rounded-full px-2.5 border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white`}>
                                            <Link>
                                                <Trash size={16}/>
                                            </Link>
                                        </Button> */}
                                        {/* Delete Dialog */}
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
                                                    <DialogTitle className="text-red-600">Confirm User Deletion</DialogTitle>
                                                </DialogHeader>
                                                <p className="text-md text-gray-700 mb-2">
                                                    This action will permanently delete <strong>{u?.name}</strong> account.
                                                    To confirm, type <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">delete-{u?.name}</span> below.
                                                </p>
                                                <Input
                                                    className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50"
                                                    placeholder={`delete-${u?.name}`}
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
                                                        onClick={handleDelete(u?._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                                </>    
                            )
                            }
                        </TableBody>
                    </Table>
                </Card>
                </>
                :
                <>
                <Card className="p-8 text-center">
                    <UserRoundX className='text-center w-full text-darkRed mb-3' size={32}/>
                    <h3 className="text-lg font-medium mb-3">No User Found</h3>
                    <p className="text-gray-500">Your user list is currently empty, once users are added, they’ll appear here</p>
                 </Card>
                </>
            }
        </div>
        </>
    )
}