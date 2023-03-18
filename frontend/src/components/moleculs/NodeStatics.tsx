import Grid from '@mui/material/Grid';
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
import Typography from '@mui/material/Typography';
import { SubTitle } from '../atom/Titles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.defaults.color = '#e0e0e0';

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

function StaticsChart(props: { title: string; staticData: StaticData | null }): JSX.Element {
  if (props.staticData === null) {
    return <></>;
  }

  return (
    <>
      <Typography variant='h6' fontWeight={'bold'}>
        {props.title}
      </Typography>
      <Line
        options={{
          responsive: true,
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels: props.staticData.labels,
          datasets: [
            {
              data: props.staticData.values,
              borderColor: 'rgb(255, 99, 132)',
            },
          ],
        }}
      />
    </>
  );
}

export default function NodeStatics(): JSX.Element {
  const [symbolNodeStatics, setSymbolNodeStatics] = useState<null | StaticData>(null);
  const [symbolHarvesterStatics, setSymbolHarvesterStatics] = useState<null | StaticData>(null);
  const [nemNodeStatics, setNemNodeStatics] = useState<null | StaticData>(null);

  useEffect(() => {
    // curupo = https://twitter.com/curupo
    fetch('https://curupo.jp/nemstats/api/chart_data', { method: 'GET' })
      .then((e: Response) => e.json())
      .then((e: NodeStaticsResponse) => {
        setSymbolNodeStatics(formatToGraphData(e.xym_nodes));
        setSymbolHarvesterStatics(formatToGraphData(e.xym_harvestings));
        setNemNodeStatics(formatToGraphData(e.xem_nodes));
      });
  }, []);

  return (
    <Grid container spacing={3} style={{ marginTop: '2rem' }}>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <StaticsChart title='Symbol Node' staticData={symbolNodeStatics} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <StaticsChart title='Symbol Harvester' staticData={symbolHarvesterStatics} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <StaticsChart title='NEM Node' staticData={nemNodeStatics} />
      </Grid>
    </Grid>
  );
}
