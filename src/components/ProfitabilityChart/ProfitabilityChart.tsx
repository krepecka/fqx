import { FC, useEffect, useRef } from 'react';
import { Chart, ChartItem, ChartConfiguration, registerables } from 'chart.js';
import type { State } from '../../hooks/useDetailsFormReducer';

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

const splitBy = 10;

function splitDateIntervalIntoParts(from: Date, to: Date | null): string[] {
  const step = (Number(to) - Number(from)) / splitBy;
  const beginAt = Number(from);

  const result = [];

  for (let i = 0; i <= splitBy; i++) {
    const date = new Date(beginAt + i * step);
    result.push(date.toISOString().split('T')[0]);
  }

  return result;
}

function splitValueIntervalIntoParts(from: number, to: number): number[] {
  const step = (to - from) / splitBy;
  const beginAt = from;

  const result = [];

  for (let i = 0; i <= splitBy; i++) {
    result.push(beginAt + step * i);
  }

  return result;
}

function estimateInflation(from: Date, to: Date | null): number {
  const yearlyInflation = 0.02;
  const days = (Number(to) - Number(from)) / 86400000;

  const inflationForPeriod = yearlyInflation / (365 / days);

  return 1 - inflationForPeriod;
}

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
      estimateInflation(fromDate, toDate) * fromValue;

    const investmentDataPoints = splitValueIntervalIntoParts(
      fromValue,
      toValue
    );
    const inflationDataPoints = splitValueIntervalIntoParts(
      fromValue,
      inflationImpactedValue
    );

    config.data.labels = labels;
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
