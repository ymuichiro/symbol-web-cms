import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StaticsValues {
  [key: string]: {
    date: number;
    num: number;
  };
}

interface NodeStaticsResponse {
  xym_nodes: StaticsValues;
  xym_harvestings: StaticsValues;
  xem_nodes: StaticsValues;
}

interface StaticData {
  labels: string[];
  values: number[];
}

function formatToGraphData(staticValues: StaticsValues): StaticData {
  const values = Object.keys(staticValues).map((key) => staticValues[key as keyof typeof staticValues]);
  const sorted = [...values].sort((a, b) => (a.date < b.date ? -1 : 1));
  return {
    labels: sorted.map((e) => e.date.toString()),
    values: sorted.map((e) => e.num),
  };
}

export default function NodeStatics(): JSX.Element {
  const [graphData, setGraphData] = useState<null | NodeStaticsResponse>(null);

  useEffect(() => {
    fetch('https://curupo.jp/nemstats/api/chart_data', { method: 'GET' })
      .then((e: Response) => e.json())
      .then((e: NodeStaticsResponse) => setGraphData(e));
  }, []);

  if (graphData === null) {
    return <></>;
  }

  return (
    <>
      <Line
        options={{ responsive: true }}
        data={{
          labels: formatToGraphData(graphData.xym_nodes).labels,
          datasets: [
            {
              label: 'Symbol Node Statics',
              data: formatToGraphData(graphData.xym_nodes).values,
              borderColor: 'rgb(255, 99, 132)',
            },
          ],
        }}
      />
    </>
  );
}
