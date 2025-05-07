// This function gets insights for chart data using basic mathematical analysis
export async function getAIInsights(
    data: any[], 
    xAxis: string, 
    yAxis: string
  ): Promise<{ insights: string; isLoading: boolean; error: string | null }> {
    if (!data || !data.length || !xAxis || !yAxis) {
      return { 
        insights: "Please provide data and axes to receive math-generated insights.",
        isLoading: false,
        error: "Missing required parameters"
      };
    }
  
    try {
      // Calculate data statistics
      const dataStats = calculateDataStats(data, xAxis, yAxis);
      
      // Generate insights based on the data
      const insights = generateInsightsFromStats(data, xAxis, yAxis, dataStats);
      
      // Return the insights
      return { 
        insights,
        isLoading: false,
        error: null
      };
    } catch (error) {
      console.error("Error generating insights:", error);
      return { 
        insights: "Unable to generate insights at the moment. Please try again later.",
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
  
  // Helper function to calculate statistics for the data
  function calculateDataStats(data: any[], xAxis: string, yAxis: string) {
    const values = data.map(item => parseFloat(item[yAxis]) || 0);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    // Calculate trend direction (increasing, decreasing, or mixed)
    let increasingCount = 0;
    let decreasingCount = 0;
    
    for (let i = 1; i < values.length; i++) {
      if (values[i] > values[i - 1]) increasingCount++;
      else if (values[i] < values[i - 1]) decreasingCount++;
    }
    
    // Calculate variation (standard deviation)
    const squaredDifferences = values.map(val => Math.pow(val - average, 2));
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length;
    const standardDeviation = Math.sqrt(variance);
    
    // Find extremes (outliers that are 1.5x outside the IQR)
    const sortedValues = [...values].sort((a, b) => a - b);
    const q1Index = Math.floor(sortedValues.length / 4);
    const q3Index = Math.floor(sortedValues.length * 3 / 4);
    const q1 = sortedValues[q1Index];
    const q3 = sortedValues[q3Index];
    const iqr = q3 - q1;
    const outliers = values.filter(val => val < q1 - 1.5 * iqr || val > q3 + 1.5 * iqr);
    
    return {
      average,
      max,
      min,
      trend: increasingCount > decreasingCount ? "increasing" : 
             decreasingCount > increasingCount ? "decreasing" : "mixed",
      standardDeviation,
      outliers,
      outlierCount: outliers.length
    };
  }
  
  // Helper function to generate insights from statistics
  function generateInsightsFromStats(
    data: any[], 
    xAxis: string, 
    yAxis: string, 
    stats: {
      average: number;
      max: number;
      min: number;
      trend: string;
      standardDeviation: number;
      outliers: number[];
      outlierCount: number;
    }
  ): string {
    // Format numbers for display
    const formatNumber = (num: number) => Number(num.toFixed(2)).toLocaleString();
    
    // Build insights from statistics
    const insights = [];
    
    // Insight about average and range
    insights.push(`• Average ${yAxis}: ${formatNumber(stats.average)}, ranging from ${formatNumber(stats.min)} to ${formatNumber(stats.max)}.`);
    
    // Insight about trend
    const trendDescription = stats.trend === "increasing" ? "upward" : 
                            stats.trend === "decreasing" ? "downward" : "fluctuating";
    insights.push(`• Data shows a ${trendDescription} trend with ${stats.standardDeviation.toFixed(2)} standard deviation.`);
    
    // Insight about outliers or notable points
    if (stats.outlierCount > 0) {
      insights.push(`• Found ${stats.outlierCount} statistical outlier${stats.outlierCount === 1 ? '' : 's'} that differ significantly from other values.`);
    } else {
      // If no outliers, provide insight about the max or min point
      const maxPoint = data.find(item => parseFloat(item[yAxis]) === stats.max);
      const minPoint = data.find(item => parseFloat(item[yAxis]) === stats.min);
      
      if (maxPoint && minPoint) {
        insights.push(`• Highest value occurs at ${maxPoint[xAxis]}, lowest at ${minPoint[xAxis]}.`);
      }
    }
    
    return insights.join('\n');
  }