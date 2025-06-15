import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ChartLine } from 'lucide-react';

const FilePreview = ({
  file,
  previewData,
  headers,
  selectedXAxis,
  selectedYAxis,
  setSelectedXAxis,
  setSelectedYAxis,
  onReset,
  onCreateVisualization,
}) => {

  return (
    <div className="space-y-6 w-full font-roboto mb-10">
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
                <h3 className="font-medium text-lg">{file.name}</h3>
                <p className="text-sm text-gray-500">
                  {Math.round(file.size / 1024)} KB •{' '}
                  {previewData.length > 0 ? `${headers.length} columns` : 'No data'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button className="rounded-lg" variant="outline" onClick={onReset}>
              Upload Different File
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <h4 className="text-lg font-medium mb-4">Data Preview</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse staggered-animate">
            <thead className="bg-gray-50 border-b">
              <tr>
                {headers.map((header, index) => (
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
              {previewData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {headers.map((header, colIndex) => (
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
        {previewData.length > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Showing all {previewData.length} rows
          </p>
        )}
      </Card>

      <Card className="p-6 animate-fade-in">
        <h4 className="text-lg font-medium mb-4">Chart Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select X-Axis
            </label>
            <Select value={selectedXAxis} onValueChange={setSelectedXAxis}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select column for X-axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Y-Axis
            </label>
            <Select value={selectedYAxis} onValueChange={setSelectedYAxis}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select column for Y-axis" />
              </SelectTrigger>
              <SelectContent>
                {headers.map((header) => (
                  <SelectItem key={header} value={header}>
                    {header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 text-right">
          <Button
            className="bg-darkRed hover:bg-midRed rounded-lg"
            onClick={onCreateVisualization}
            disabled={!selectedXAxis || !selectedYAxis}
          >
            <ChartLine />
            Create Visualization
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FilePreview;