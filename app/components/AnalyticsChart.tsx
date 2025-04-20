'use client';

import React, { useEffect, useRef } from 'react';
import type { ChartConfiguration, ChartType, ChartData, ChartOptions } from 'chart.js';

interface AnalyticsChartProps {
  type?: ChartType;
  data: ChartData;
  options?: ChartOptions;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ type = 'line', data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const Chart = require('chart.js/auto').default;

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type,
          data,
          options,
        } as ChartConfiguration);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default AnalyticsChart;
