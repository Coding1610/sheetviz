import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';

// Initialize Highcharts 3D module
if (typeof Highcharts3D === 'function' && typeof Highcharts === 'object') {
  Highcharts3D(Highcharts);
}

// Common wrapper to handle data transformation for 3D charts
const Chart3DWrapper = ({ chartType, chartData, xAxis, yAxis }) => {
  useEffect(() => {
    if (typeof Highcharts3D === 'function') {
      Highcharts3D(Highcharts);
    }
  }, []);

  const prepareData = () => {
    if (!chartData || !chartData.labels || !chartData.datasets) {
      return [];
    }

    const labels = chartData.labels;
    const values = chartData.datasets[0].data;

    return labels.map((label, index) => [label, values[index] || 0]);
  };

  const getColors = () => {
    if (!chartData || !chartData.datasets) {
      return [];
    }

    return chartData.datasets[0].backgroundColor;
  };

  switch (chartType) {
    case 'pie':
      return <Pie3D data={prepareData()} colors={getColors()} xAxis={xAxis} yAxis={yAxis} />;
    case 'column':
      return <Column3D data={prepareData()} colors={getColors()} xAxis={xAxis} yAxis={yAxis} />;
    case 'donut':
      return <Donut3D data={prepareData()} colors={getColors()} xAxis={xAxis} yAxis={yAxis} />;
    default:
      return <Column3D data={prepareData()} colors={getColors()} xAxis={xAxis} yAxis={yAxis} />;
  }
};

// Pie 3D Chart Component
const Pie3D = ({ data, colors, xAxis, yAxis }) => {
  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    title: {
      text: `${yAxis || 'Data'} by ${xAxis || 'Category'}`
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 40,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: yAxis || 'Value',
      data: data,
      colors: colors
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

// Column 3D Chart Component
const Column3D = ({ data, colors, xAxis, yAxis }) => {
  const options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50,
        viewDistance: 25
      }
    },
    title: {
      text: `${yAxis || 'Data'} by ${xAxis || 'Category'}`
    },
    plotOptions: {
      column: {
        depth: 25,
        colorByPoint: true
      }
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px'
        }
      }
    },
    yAxis: {
      title: {
        text: yAxis || 'Value'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    series: [{
      name: yAxis || 'Value',
      data: data,
      colors: colors
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

// Donut 3D Chart Component
const Donut3D = ({ data, colors, xAxis, yAxis }) => {
  const options = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      }
    },
    title: {
      text: `${yAxis || 'Data'} by ${xAxis || 'Category'}`
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 40,
        innerSize: '50%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: yAxis || 'Value',
      data: data,
      colors: colors
    }]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

// Export all chart components
export { Chart3DWrapper, Column3D, Pie3D, Donut3D };