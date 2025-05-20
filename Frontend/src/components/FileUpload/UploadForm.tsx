
import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { read, utils } from 'xlsx';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import FilePreview from './FilePreview';

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [fullData, setFullData] = useState<any[] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedXAxis, setSelectedXAxis] = useState<string>('');
  const [selectedYAxis, setSelectedYAxis] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processExcelFile = async (file: File) => {
    try {
      setIsProcessing(true);
      
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert sheet to JSON
      const jsonData = utils.sheet_to_json(worksheet);
      
      // Extract headers
      if (jsonData.length > 0) {
        const headers = Object.keys(jsonData[0]);
        setHeaders(headers);
        
        // Auto-select first two columns as X and Y axes
        if (headers.length >= 2) {
          setSelectedXAxis(headers[0]);
          setSelectedYAxis(headers[1]);
        }
      }
      
      // Store full data
      setFullData(jsonData);
      
      // Show preview (first 10 rows)
      setPreviewData(jsonData.slice(0, 10));
      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing Excel file:', error);
      toast.error('Error processing the Excel file. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check if file is Excel or CSV
      if (droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          droppedFile.type === 'application/vnd.ms-excel' || 
          droppedFile.type === 'text/csv' ||
          droppedFile.name.endsWith('.xlsx') ||
          droppedFile.name.endsWith('.xls') ||
          droppedFile.name.endsWith('.csv')) {
        
        setFile(droppedFile);
        processExcelFile(droppedFile);
      } else {
        toast.error('Please upload an Excel or CSV file.');
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      processExcelFile(selectedFile);
    }
  };

  const handleCreateVisualization = () => {
    if (!selectedXAxis || !selectedYAxis) {
      toast.error('Please select both X and Y axes for your chart.');
      return;
    }

    // Navigate to visualization page with the data
    toast.success('File processed successfully!');
    navigate('/visualization/new', {
      state: {
        data: fullData,
        xAxis: selectedXAxis,
        yAxis: selectedYAxis
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload Excel File</h1>
        <p className="text-gray-600 mt-2">
          Upload your Excel file to visualize and analyze your data
        </p>
      </div>

      {!file && (
        <div
          className={`upload-area border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging ? 'border-brand-purple bg-brand-purple-soft' : 'border-gray-300'
          } transition-all duration-200`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-purple-soft rounded-full flex items-center justify-center mb-4">
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
            <p className="text-gray-500 mb-6">
              or click to browse from your computer
            </p>
            <Button
              className="bg-brand-purple hover:bg-brand-purple-600"
              onClick={() => fileInputRef.current?.click()}
            >
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple mx-auto"></div>
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
