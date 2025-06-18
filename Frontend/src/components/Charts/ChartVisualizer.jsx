import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { showToast } from '@/helpers/showToast';
import { Chart3DWrapper } from '../Charts3D/Chart3DComponents';
import {
  Bar,
  Line,
  Pie,
  Doughnut
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartVisualizer = ({ data, xAxis, yAxis }) => {

  const [chartType, setChartType] = useState('bar');
  const chartRef = useRef(null);

  const prepareChartData = () => {
    if (!data || !xAxis || !yAxis || data.length === 0) {
      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(155, 135, 245, 0.6)',
              'rgba(126, 105, 171, 0.6)',
              'rgba(110, 89, 165, 0.6)',
              'rgba(214, 188, 250, 0.6)',
              'rgba(139, 92, 246, 0.6)',
              'rgba(229, 222, 255, 0.6)',
            ],
            borderColor: 'rgba(155, 135, 245, 1)',
            borderWidth: 1,
          },
        ],
      };
    }

    const labels = Array.from(new Set(data.map(item => String(item[xAxis])))).sort();

    const dataValues = labels.map(label => {
      const matchingItems = data.filter(item => String(item[xAxis]) === label);
      if (matchingItems.length > 0) {
        const sum = matchingItems.reduce((acc, item) => {
          const value = parseFloat(item[yAxis]);
          return acc + (isNaN(value) ? 0 : value);
        }, 0);
        return sum / matchingItems.length;
      }
      return 0;
    });

    const purpleHues = [
      'rgba(155, 135, 245, 0.6)',
      'rgba(126, 105, 171, 0.6)',
      'rgba(110, 89, 165, 0.6)',
      'rgba(214, 188, 250, 0.6)',
      'rgba(139, 92, 246, 0.6)',
      'rgba(229, 222, 255, 0.6)',
      'rgba(167, 139, 250, 0.6)',
      'rgba(192, 132, 252, 0.6)',
      'rgba(216, 180, 254, 0.6)',
      'rgba(107, 70, 193, 0.6)'
    ];

    const backgroundColors = labels.map((_, idx) => purpleHues[idx % purpleHues.length]);

    const borderColors = chartType === 'line'
      ? 'rgba(155, 135, 245, 1)'
      : backgroundColors.map(color => color.replace('0.6', '1'));

    return {
      labels,
      datasets: [
        {
          label: yAxis,
          data: dataValues,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
          tension: 0.3,
          pointBackgroundColor: chartType === 'line' ? 'rgba(155, 135, 245, 1)' : undefined,
          pointBorderColor: chartType === 'line' ? '#fff' : undefined,
          pointHoverBackgroundColor: chartType === 'line' ? '#fff' : undefined,
          pointHoverBorderColor: chartType === 'line' ? 'rgba(155, 135, 245, 1)' : undefined,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${yAxis || 'Data'} by ${xAxis || 'Category'}`,
        font: {
          size: 18
        }
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: 'rgba(155, 135, 245, 0.6)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          title: function (tooltipItem) {
            return tooltipItem[0].label;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        beginAtZero: true
      }
    } : undefined
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} />;
      case 'pie 3d':
        return <Chart3DWrapper chartType="pie" chartData={chartData} xAxis={xAxis} yAxis={yAxis} />;
      case 'column 3d':
        return <Chart3DWrapper chartType="column" chartData={chartData} xAxis={xAxis} yAxis={yAxis} />;
      case 'donut 3d':
        return <Chart3DWrapper chartType="donut" chartData={chartData} xAxis={xAxis} yAxis={yAxis} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  const downloadPNG = async () => {
    try {
      if (!chartRef.current) {
        showToast('Error','Chart element not found');
        return;
      }
  
      showToast('Info','Preparing PNG download...');
  
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      });
  
      const image = canvas.toDataURL('image/png', 1.0);
  
      const link = document.createElement('a');
      link.href = image;
      link.download = `chart-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      showToast('Success','Chart downloaded as PNG');
    } catch (error) {
      console.error('Error downloading chart as PNG:', error);
      showToast('Error','Failed to download chart as PNG, Please try again');
    }
  };
  
  const downloadPDF = async () => {
    try {
      if (!chartRef.current) {
        showToast('Error','Chart element not found');
        return;
      }
  
      showToast('Info','Preparing PDF download...');
  
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      });
  
      const imageData = canvas.toDataURL('image/png', 1.0);
  
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      const ratio = canvas.width / canvas.height;
      let imgWidth = pdfWidth - 20;
      let imgHeight = imgWidth / ratio;
  
      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = imgHeight * ratio;
      }
  
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;
  
      pdf.setFontSize(12);
      pdf.text(`Chart: ${yAxis || 'Data'} by ${xAxis || 'Category'}`, 10, 10);
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, 16);
  
      pdf.addImage(imageData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`chart-${Date.now()}.pdf`);
  
      showToast('Success','Chart downloaded as PDF!');
    } catch (error) {
      console.error('Error downloading chart as PDF:', error);
      showToast('Error','Failed to download chart as PDF, Please try again');
    }
  };

  const shareChart = async () => {
    try {
      if (!chartRef.current) {
        showToast('Error','Chart element not found');
        return;
      }
  
      if (navigator.share) {
        try {
          const canvas = await html2canvas(chartRef.current, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true,
          });
  
          canvas.toBlob(async (blob) => {
            if (!blob) {
              throw new Error('Could not create blob from canvas');
            }
  
            const file = new File([blob], 'chart.png', { type: 'image/png' });
  
            try {
              await navigator.share({
                title: 'Excel Analytics Chart',
                text: `Sharing ${yAxis || 'Data'} by ${xAxis || 'Category'} chart`,
                files: [file],
              });
              showToast('Success','Chart shared successfully');
            } catch (error) {
              console.log('File sharing failed, falling back to URL sharing', error);
              await navigator.share({
                title: 'Excel Analytics Chart',
                text: `Check out this ${yAxis || 'Data'} by ${xAxis || 'Category'} chart!`,
                url: window.location.href,
              });
              showToast('Success','Chart link shared successfully');
            }
          }, 'image/png');
        } catch (shareError) {
          console.error('Share failed:', shareError);
          await navigator.clipboard.writeText(window.location.href);
          showToast('Success','Chart link copied to clipboard');
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Success','Chart link copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing chart:', error);
      showToast('Error','Failed to share chart');
    }
  };
  
  return (
    <Card className="shadow-md animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={chartType === 'bar' ? 'default' : 'outline'} 
            className={chartType === 'bar' ? 'bg-darkRed hover:bg-darkRed-600 rounded-lg' : 'rounded-lg'}
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </Button>
          <Button 
            variant={chartType === 'line' ? 'default' : 'outline'} 
            className={chartType === 'line' ? 'bg-darkRed hover:bg-darkRed-600 rounded-lg' : 'rounded-lg'}
            onClick={() => setChartType('line')}
          >
            Line Chart
          </Button>
          <Button 
            variant={chartType === 'pie' ? 'default' : 'outline'}
            className={chartType === 'pie' ? 'bg-darkRed hover:bg-darkRed-600 rounded-lg' : 'rounded-lg'}
            onClick={() => setChartType('pie')}
          >
            Pie Chart
          </Button>
          <Button 
            variant={chartType === 'doughnut' ? 'default' : 'outline'}
            className={chartType === 'doughnut' ? 'bg-darkRed hover:bg-darkRed-600 rounded-lg' : 'rounded-lg'}
            onClick={() => setChartType('doughnut')}
          >
            Donut Chart
          </Button>
          <Button 
            variant={chartType === 'pie 3d' ? 'default' : 'outline'}
            className={chartType === 'pie 3d' ? 'bg-darkRed hover:bg-darkRed-600 rounded-lg' : 'rounded-lg'}
            onClick={() => setChartType('pie 3d')}
          >
            3D Pie Chart
          </Button>
          <Button 
            variant={chartType === 'column 3d' ? 'default' : 'outline'}
            className={chartType === 'column 3d' ? 'bg-darkRed hover:bg-darkRed-600 rounded-lg' : 'rounded-lg'}
            onClick={() => setChartType('column 3d')}
          >
            3D Column Chart
          </Button>
          <Button 
            variant={chartType === 'donut 3d' ? 'default' : 'outline'}
            className={chartType === 'donut 3d' ? 'bg-darkRed hover:bg-darkRed-600 rounded-lg' : 'rounded-lg'}
            onClick={() => setChartType('donut 3d')}
          >
            3D Donut Chart
          </Button>
        </div>
        
        <div ref={chartRef} className="chart-container transition-all duration-300 h-[400px] bg-white p-4 rounded-lg">
          {renderChart()}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6 justify-end">
          {/* <Button  className="rounded-lg" variant="outline" onClick={shareChart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Share
          </Button> */}
          <Button  className="rounded-lg" variant="outline" onClick={downloadPNG}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PNG
          </Button>
          <Button className="rounded-lg" variant="outline" onClick={downloadPDF}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartVisualizer;