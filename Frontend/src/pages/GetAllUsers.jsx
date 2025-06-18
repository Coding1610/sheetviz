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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

export default function GetAllUsers() {
    const [refreshData, setRefreshData] = useState(false)
    const [dialogStates, setDialogStates] = useState({}) // per-user dialog state

    const { data: userData, loading } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/get-all-users`,
        { method: 'get', credentials: 'include' },
        [refreshData]
    )

    const usersArray = userData?.allUsers || []
    const users = [...usersArray].reverse()

    const toggleDialog = (userId, open) => {
        setDialogStates((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                open,
            },
        }))
    }

    const setConfirmation = (userId, text) => {
        setDialogStates((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                confirmationText: text,
            },
        }))
    }

    const handleDelete = async (userId, userName) => {
        const response = await deleteData(
            `${getEnv('VITE_API_BASE_URL')}/user/delete/${userId}`
        )
        if (response) {
            showToast('Success', 'User Deleted Successfully')
            setRefreshData((prev) => !prev)
        } else {
            showToast('Error', 'Error while deleting user')
        }
        toggleDialog(userId, false)
    }

    if (loading) return <Loading />

    return (
        <div className="w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mb-4">
            <div className="mb-8 mt-8 ml-5">
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-gray-600 mt-2">
                    Stay in control of your users and easily manage them
                </p>
            </div>

            {users.length > 0 ? (
                <Card className="mx-4 px-2 pt-2">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                                <TableHead>Role</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((u) => {
                                const state = dialogStates[u._id] || {
                                    open: false,
                                    confirmationText: '',
                                }
                                const requiredText = `delete-${u.name}`

                                return (
                                    <TableRow
                                        key={u._id}
                                        className={`${
                                            u.role === 'Admin'
                                                ? 'bg-darkRed/30'
                                                : ''
                                        } text-nowrap`}
                                    >
                                        <TableCell>{u.role}</TableCell>
                                        <TableCell>{u.name}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage
                                                    className="w-8 h-8 rounded-full"
                                                    src={
                                                        u.avatar ||
                                                        `https://api.dicebear.com/5.x/initials/svg?seed=${u.name}`
                                                    }
                                                />
                                                <AvatarFallback>PP</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            {u.createdAt
                                                ? moment(u.createdAt).format(
                                                      'DD-MM-YYYY'
                                                  )
                                                : '_'}
                                        </TableCell>
                                        <TableCell>
                                            {u.role !== 'Admin' && (
                                                <Dialog
                                                    open={state.open}
                                                    onOpenChange={(open) =>
                                                        toggleDialog(u._id, open)
                                                    }
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            className="shadow-none rounded-full p-2.5 bg-white text-darkRed hover:bg-darkRed hover:text-white"
                                                            onClick={() =>
                                                                toggleDialog(u._id, true)
                                                            }
                                                        >
                                                            <Trash size={16} />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle className="text-red-600">
                                                                Confirm User Deletion
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <p className="text-md text-gray-700 mb-2">
                                                            This action will permanently
                                                            delete{' '}
                                                            <strong>{u.name}</strong>'s
                                                            account. Type{' '}
                                                            <code className="bg-gray-100 px-1 py-0.5 rounded">
                                                                delete-{u.name}
                                                            </code>{' '}
                                                            to confirm.
                                                        </p>
                                                        <Input
                                                            placeholder={`delete-${u.name}`}
                                                            value={
                                                                state.confirmationText
                                                            }
                                                            onChange={(e) =>
                                                                setConfirmation(
                                                                    u._id,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                        <div className="flex justify-end mt-4">
                                                            <Button
                                                                variant="outline"
                                                                onClick={() =>
                                                                    toggleDialog(
                                                                        u._id,
                                                                        false
                                                                    )
                                                                }
                                                                className="mr-2"
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                disabled={
                                                                    state.confirmationText !==
                                                                    requiredText
                                                                }
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        u._id,
                                                                        u.name
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <Card className="p-8 text-center">
                    <UserRoundX
                        className="text-center w-full text-darkRed mb-3"
                        size={32}
                    />
                    <h3 className="text-lg font-medium mb-3">No User Found</h3>
                    <p className="text-gray-500">
                        Your user list is currently empty. Once users are added,
                        they’ll appear here.
                    </p>
                </Card>
            )}
        </div>
    )
}
