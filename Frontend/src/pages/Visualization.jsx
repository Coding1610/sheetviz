import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import ChartVisualizer from '@/components/Charts/ChartVisualizer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { showToast } from '@/helpers/showToast';
// import { getFileById } from '@/services/FileService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAIInsights } from '@/utils/aiInsights';
import { RouteSignIn, RouteUploadFile } from '@/helpers/RouteName';
import { CloudUpload } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';

const Visualization = () => {

  // const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  // const { id } = useParams();

  const [chartData, setChartData] = useState(null);
  const [xAxis, setXAxis] = useState(undefined);
  const [yAxis, setYAxis] = useState(undefined);
  // const [shareDialogOpen, setShareDialogOpen] = useState(false);
  // const [shareLink, setShareLink] = useState('');
  const [aiInsights, setAiInsights] = useState("Click 'Generate Insights' to analyze your data.");
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const user = useSelector((state) => state.user);

  // upload file to db
  const handleUpload = async() => {
    
    const userId = user?.user?._id;
    const previewData = location.state.data;
    const file = location.state.fileData;

    const formData = new FormData();
    formData.append('file',file);
    formData.append('previewData', JSON.stringify(previewData));
    formData.append('userId',userId);

    const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/upload-file`,{
      method:"post",
      credentials:'include',
      body:formData
    });

    if(!response.ok){
      showToast('Error', 'Error while uploading file, Please try again');
    }
    else{
      showToast('Success', 'File Uploaded Successfully');
    }

  }

  useEffect(() => {

    if (location.state?.data) {
      setChartData(location.state.data);
      setXAxis(location.state.xAxis);
      setYAxis(location.state.yAxis);
    } else if (id && id !== 'new') {
      const fileId = parseInt(id);
      if (!isNaN(fileId)) {
        const fileData = getFileById(fileId);
        if (fileData) {
          const sampleData = getSampleData();
          setChartData(sampleData);
          setXAxis('month');
          setYAxis('sales2024');
        } else {
          toast.error('File not found');
          navigate('/dashboard');
        }
      }
    } else {
      const sampleData = getSampleData();
      setChartData(sampleData);
      setXAxis('month');
      setYAxis('sales2024');
    }
  }, [navigate, location.state, location.pathname]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    showToast('Success','Link copied to clipboard!');
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleGetInsights = async () => {
    if (!chartData || !xAxis || !yAxis) {
      showToast('Error','Data and axes must be selected to generate insights');
      return;
    }

    setIsLoadingInsights(true);

    try {
      const result = await getAIInsights(chartData || [], xAxis || '', yAxis || '');

      if (result.error) {
        showToast('Error',`Error: ${result.error}`);
      } else {
        setAiInsights(result.insights);
        showToast('Success','Insights generated successfully!');
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      showToast('Error','Failed to generate insights. Please try again.');
    } finally {
      setIsLoadingInsights(false);
    }
  };

  return (
    <div className="font-roboto mx-auto animate-fade-in w-full pl-5 pr-5 sm:pl-15 sm:pr-15">
      <div className="container mx-auto mt-5 pb-12 px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">{yAxis || 'Data'} Visualization</h1>
          <p className="text-gray-600 mt-2">Visualization of your data from {xAxis || 'selected axes'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="visualization" className="w-full">
              <TabsList className="mb-6 bg-white">
                <TabsTrigger className="p-2 rounded-lg " value="visualization">Visualization</TabsTrigger>
                <TabsTrigger className="p-2 rounded-lg " value="data">Data Table</TabsTrigger>
              </TabsList>

              <TabsContent value="visualization" className="mt-0">
                <ChartVisualizer data={chartData || []} xAxis={xAxis} yAxis={yAxis} />
              </TabsContent>

              <TabsContent value="data" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    {chartData && chartData.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {Object.keys(chartData[0]).map((header) => (
                                <th
                                  key={header}
                                  className="px-6 py-3 text-left text-xs font-medium text-darkRed uppercase tracking-wider"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {chartData.map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                {Object.values(row).map((value, colIndex) => (
                                  <td
                                    key={`${index}-${colIndex}`}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                  >
                                    {value?.toString() || ''}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center py-6 text-gray-500">No data available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Card className="animate-fade-in mt-6" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-6">
                <h3 className="flex items-center justify-between">
                  <span className="font-medium text-lg">Data Insights</span>
                  <Button 
                    onClick={handleGetInsights} 
                    variant="outline" 
                    size="sm"
                    className="text-[14px]"
                    disabled={isLoadingInsights}
                  >
                    {isLoadingInsights ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10 8 16 12 10 16 10 8"></polygon>
                        </svg>
                        Generate Insights
                      </>
                    )}
                  </Button>
                </h3>
                <div className="prose prose-sm text-gray-600 mt-2">
                  {chartData && xAxis && yAxis ? (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      {aiInsights.split('\n').map((line, i) => (
                        line.trim() ? <p key={i} className="my-1">{line}</p> : null
                      ))}
                    </div>
                  ) : (
                    <p>Upload and select data axes to receive insights about your visualization.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-3">Chart Summary</h3>
                <p className="text-gray-600 mb-4">
                  This visualization shows {yAxis || 'data'} by {xAxis || 'category'}.
                </p>
                {chartData && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Records</span>
                      <span className="font-medium">{chartData.length}</span>
                    </div>
                    {xAxis && yAxis && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Average {yAxis}</span>
                          <span className="font-medium">
                            {(
                              chartData.reduce(
                                (sum, item) => sum + (parseFloat(item[yAxis]) || 0),
                                0
                              ) / chartData.length
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Highest {yAxis}</span>
                          <span className="font-medium">
                            {Math.max(...chartData.map((item) => parseFloat(item[yAxis]) || 0)).toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-3">Visualization Features</h3>
                <div className="prose prose-sm text-gray-600">
                  <p className="mb-2">Toggle between different visualization options:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="font-medium">Bar Charts</span> For comparing categorical data</li>
                    <li><span className="font-medium">Line Charts</span> For showing trends over time</li>
                    <li><span className="font-medium">Pie/Doughnut Charts</span> For showing proportions of a whole</li>
                    <li><span className="font-medium">3D Charts</span> For enhancing visual depth in data comparisons, ideal for presentations and highlighting standout values in multi-dimensional datasets.</li>
                  </ul>
                  <p className="mt-3 mb-2">Additional features:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Interactive tooltips on hover</li>
                    <li>Download options (PNG, PDF)</li>
                    <li>Share visualization with others</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-6">
                <h3 className="font-medium text-lg mb-3">Actions</h3>
                <div className="space-y-2">
                  <button 
                    className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    onClick={handleShare}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span>Share</span>
                  </button>
                  
                  <button 
                    className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <Link to={RouteUploadFile}>
                      <span>New Upload</span>
                    </Link>
                  </button>

                  <button
                    onClick={handleUpload} 
                    className="w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 bg-darkRed hover:bg-midRed text-white transition-colors"
                  >
                    {/* <Link to={'/'} className='flex justify-center items-center gap-2'> */}
                      <CloudUpload className='text-white w-5'/>
                      <span>Save to Cloud</span>
                    {/* </Link> */}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      {/* <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Visualization</DialogTitle>
            <DialogDescription>
              Share this visualization with others by copying the link below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Input
                value={shareLink}
                readOnly
                className="w-full"
              />
            </div>
            <Button type="submit" size="sm" className="px-3 bg-brand-purple hover:bg-brand-purple-600" onClick={handleCopyLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
              Copy
            </Button>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Or share via</h4>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(`Check out this ${yAxis || 'data'} visualization!`)}`, '_blank');
                }}
              >
                Twitter
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => {
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`, '_blank');
                }}
              >
                LinkedIn
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => {
                  window.open(`mailto:?subject=${encodeURIComponent(`SheetViz: ${yAxis || 'Data'} Visualization`)}&body=${encodeURIComponent(`Check out this visualization: ${shareLink}`)}`, '_blank');
                }}
              >
                Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default Visualization;