import React from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import { Card } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';

export default function FileView() {

    const location = useLocation();
    const pathname = location.pathname;
    const FileId = pathname.substring(pathname.lastIndexOf('/') + 1);

    const {data:file, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/file-view/${FileId}`, {
        method:'get',
        credentials:'include'
    },[]);

    const fileHeader = file?.file?.previewData?.length > 0 ? Object.keys(file?.file?.previewData[0]) : [];
    
    if(loading) return <Loading/>

    return (
        <>
        <div className='mx-auto animate-fade-in w-full pl-10 pr-10 font-roboto mt-8 mb-8'>
            <Card className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
                <div>
                    <div className="flex items-center">
                    <div className="bg-brandpurplesoft/50 p-2 rounded-lg mr-3">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-darkRed"
                        >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <line x1="10" y1="9" x2="8" y2="9"></line>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-medium text-lg">{file?.file?.fileName}</h3>
                        <p className="text-sm text-gray-500">
                        {file?.file.size} •{' '}
                        {fileHeader.length > 0 ? `${fileHeader.length} columns` : 'No data'}
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                <Separator className="my-4" />

                <div className="overflow-x-auto">
                <table className="min-w-full border-collapse staggered-animate">
                    <thead className="bg-gray-50 border-b">
                    <tr>
                        {fileHeader.map((header, index) => (
                        <th
                            key={index}
                            className="px-4 py-3 text-left text-xs font-medium text-darkRed uppercase tracking-wider"
                        >
                            {header}
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {file?.file?.previewData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                        {fileHeader.map((header, colIndex) => (
                            <td
                            key={`${rowIndex}-${colIndex}`}
                            className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"
                            >
                            {row[header]?.toString() || ''}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                {file?.file?.previewData.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                    Showing all {file?.file?.previewData.length} rows
                </p>
                )}
            </Card>
        </div>
        </>
    )
}