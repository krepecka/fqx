import { FC, useEffect, useRef } from 'react';
import { Chart, ChartItem, ChartConfiguration, registerables } from 'chart.js';

import {
  estimateInflationForPeriod,
  splitValueIntervalIntoParts,
  splitDateIntervalIntoParts,
} from './helpers/chartCalculations';

import type { State } from '../../hooks/useDetailsReducer';

Chart.register(...registerables);

const config = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Your investment',
        data: [],
        borderColor: 'green',
        backgroundColor: 'green',
      },
      {
        label: 'Capital impacted by inflation',
        data: [],
        borderColor: 'red',
        backgroundColor: 'red',
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  },
} as ChartConfiguration;

type Props = {
  state: State;
};

const ProfitabilityChart: FC<Props> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    paymentDate: fromDate,
    dueDate: toDate,
    purchasePrice: fromValue,
    faceValue: toValue,
  } = state;

  useEffect(() => {
    const labels = splitDateIntervalIntoParts(fromDate, toDate);
    const inflationImpactedValue =
      estimateInflationForPeriod(fromDate, toDate) * fromValue;

    const investmentDataPoints = splitValueIntervalIntoParts(
      fromValue,
      toValue
    );
    const inflationDataPoints = splitValueIntervalIntoParts(
      fromValue,
      inflationImpactedValue
    );

    config.data.labels = labels;
    // TODO: these two don't look good, not gonna lie
    config.data.datasets[0].data = investmentDataPoints;
    config.data.datasets[1].data = inflationDataPoints;

    const chartRef = new Chart(canvasRef.current as ChartItem, config);

    return () => {
      chartRef.destroy();
    };
  }, [fromDate, toDate, fromValue, toValue]);

  return <canvas ref={canvasRef} />;
};

export default ProfitabilityChart;
