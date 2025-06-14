import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true
});

// This function gets insights for chart data using OpenAI
export async function getAIInsights(data, xAxis, yAxis, apiKey) {
  if (!data || !data.length || !xAxis || !yAxis) {
    return {
      insights: "Please provide data and axes to receive AI-generated insights.",
      isLoading: false,
      error: "Missing required parameters"
    };
  }

  try {
    // Use provided API key if available
    const client = apiKey
      ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
      : openai;

    // Calculate basic statistics to help inform the AI
    const dataStats = calculateDataStats(data, xAxis, yAxis);

    // Prepare a description of the data for OpenAI
    const dataDescription = `
      Data contains ${data.length} records with x-axis "${xAxis}" and y-axis "${yAxis}".
      Average ${yAxis}: ${dataStats.average}
      Max ${yAxis}: ${dataStats.max}
      Min ${yAxis}: ${dataStats.min}
      Overall trend: ${dataStats.trend}
      
      Sample data points (up to 5):
      ${JSON.stringify(data.slice(0, 5))}
    `;

    // Get insights from OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a data analyst that provides concise, bullet-point insights about data visualization. Focus on patterns, trends, anomalies, and actionable insights. Keep your analysis to 3-5 short bullet points, starting each with a bullet point character '•'."
        },
        {
          role: "user",
          content: `Analyze this chart data and provide insightful observations: ${dataDescription}`
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const aiResponse = completion.choices[0].message.content || "Unable to generate insights.";

    return {
      insights: aiResponse,
      isLoading: false,
      error: null
    };
  } catch (error) {
    console.error("Error generating insights with OpenAI:", error);

    // Fall back to basic mathematical insights if OpenAI fails
    const dataStats = calculateDataStats(data, xAxis, yAxis);
    const fallbackInsights = generateInsightsFromStats(data, xAxis, yAxis, dataStats);

    return {
      insights: `${fallbackInsights}\n\n(Note: Generated using fallback algorithm due to OpenAI service issue)`,
      isLoading: false,
      error: error instanceof Error ? error.message : "Unknown error connecting to OpenAI"
    };
  }
}

// Helper function to calculate statistics for the data
function calculateDataStats(data, xAxis, yAxis) {
  const values = data.map(item => parseFloat(item[yAxis]) || 0);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const average = sum / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  let increasingCount = 0;
  let decreasingCount = 0;

  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i - 1]) increasingCount++;
    else if (values[i] < values[i - 1]) decreasingCount++;
  }

  const squaredDifferences = values.map(val => Math.pow(val - average, 2));
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / values.length;
  const standardDeviation = Math.sqrt(variance);

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
    trend: increasingCount > decreasingCount ? "increasing" : decreasingCount > increasingCount ? "decreasing" : "mixed",
    standardDeviation,
    outliers,
    outlierCount: outliers.length
  };
}

// Helper function to generate insights from statistics (fallback when OpenAI fails)
function generateInsightsFromStats(data, xAxis, yAxis, stats) {
  const formatNumber = num => Number(num.toFixed(2)).toLocaleString();

  const insights = [];

  insights.push(`• Average ${yAxis}: ${formatNumber(stats.average)}, ranging from ${formatNumber(stats.min)} to ${formatNumber(stats.max)}.`);

  const trendDescription = stats.trend === "increasing" ? "upward" :
    stats.trend === "decreasing" ? "downward" : "fluctuating";
  insights.push(`• Data shows a ${trendDescription} trend with ${stats.standardDeviation.toFixed(2)} standard deviation.`);

  if (stats.outlierCount > 0) {
    insights.push(`• Found ${stats.outlierCount} statistical outlier${stats.outlierCount === 1 ? '' : 's'} that differ significantly from other values.`);
  } else {
    const maxPoint = data.find(item => parseFloat(item[yAxis]) === stats.max);
    const minPoint = data.find(item => parseFloat(item[yAxis]) === stats.min);

    if (maxPoint && minPoint) {
      insights.push(`• Highest value occurs at ${maxPoint[xAxis]}, lowest at ${minPoint[xAxis]}.`);
    }
  }

  return insights.join('\n');
}