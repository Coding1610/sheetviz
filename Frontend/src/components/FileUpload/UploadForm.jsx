import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { read, utils } from 'xlsx';
import { Button } from '@/components/ui/button';
import FilePreview from './FilePreview';
import { showToast } from '@/helpers/showToast';
import { FileSearch } from 'lucide-react';

const UploadForm = () => {
    
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [fullData, setFullData] = useState(null);
    const [headers, setHeaders] = useState([]);
    const [selectedXAxis, setSelectedXAxis] = useState('');
    const [selectedYAxis, setSelectedYAxis] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const processExcelFile = async (file) => {
        try {
        setIsProcessing(true);
        const data = await file.arrayBuffer();
        const workbook = read(data);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = utils.sheet_to_json(worksheet);

        if (jsonData.length > 0) {
            const headers = Object.keys(jsonData[0]);
            setHeaders(headers);
            if (headers.length >= 2) {
                setSelectedXAxis(headers[0]);
                setSelectedYAxis(headers[1]);
            }
        }

        setFullData(jsonData);
        setPreviewData(jsonData);
        setIsProcessing(false);
        } catch (error) {
            console.error('Error processing Excel file:', error);
            showToast('Error', 'Error processing the Excel file, Please try again');
            setIsProcessing(false);
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];
        if (
            droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            droppedFile.type === 'application/vnd.ms-excel' ||
            droppedFile.type === 'text/csv' ||
            droppedFile.name.endsWith('.xlsx') ||
            droppedFile.name.endsWith('.xls') ||
            droppedFile.name.endsWith('.csv')
        ) {
            setFile(droppedFile);
            processExcelFile(droppedFile);
        } else {
            showToast('Error','Please upload an Excel or CSV file');
        }
        }
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            processExcelFile(selectedFile);
        }
    };

    const handleCreateVisualization = () => {
        if (!selectedXAxis || !selectedYAxis) {
            showToast('Error','Please select both X and Y axes for your chart');
            return;
        }
        showToast('Success','File processed successfully');
        navigate(`/dashboard/visualization/file`, {
            state: {
                fileData: file,
                data: fullData,
                xAxis: selectedXAxis,
                yAxis: selectedYAxis,
            },
        });
    };

    return (
        <div className="mx-auto max-w-5xl animate-fade-in w-full pl-10 pr-10 font-roboto">

            <div className="mb-8 mt-8">
                <h1 className="text-3xl font-bold">Upload Excel File</h1>
                <p className="text-gray-600 mt-2">
                    Upload your Excel file to visualize and analyze your data
                </p>
            </div>

        {!file && (
            <div
            className={`upload-area border-2 border-dashed rounded-lg p-12 text-center ${
                isDragging ? 'border-darkRed bg-brandpurplesoft/40' : 'border-brandpurplesoft bg-white'
            } transition-all duration-200`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            >
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brandpurplesoft/90 rounded-full flex items-center justify-center mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-purple"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Drag & Drop Your Excel File</h3>
                <p className="text-gray-500 mb-6">or click to browse from your computer</p>
               
                <Button
                    className="bg-darkRed hover:bg-midRed rounded-lg"
                    onClick={() => fileInputRef.current?.click()}
                    >
                        <FileSearch className='text-white'/>
                    Browse Files
                </Button>
                <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                />
            </div>
            </div>
        )}

        {isProcessing && (
            <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkRed mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing your file...</p>
            </div>
        )}

        {file && previewData && !isProcessing && (
            <FilePreview
            file={file}
            previewData={previewData}
            headers={headers}
            selectedXAxis={selectedXAxis}
            selectedYAxis={selectedYAxis}
            setSelectedXAxis={setSelectedXAxis}
            setSelectedYAxis={setSelectedYAxis}
            onReset={() => {
                setFile(null);
                setPreviewData(null);
                setFullData(null);
                setHeaders([]);
                setSelectedXAxis('');
                setSelectedYAxis('');
            }}
            onCreateVisualization={handleCreateVisualization}
            />
        )}
        </div>
    );
};

export default UploadForm;