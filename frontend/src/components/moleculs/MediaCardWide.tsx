import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface MediaCardWideArgs {
  title: string;
  description: string;
  image: StaticImageData;
  isShowMore?: boolean;
  showMoreLink?: string;
  style?: CSSProperties;
  imageHeight?: string;
}

/**
 * https://mui.com/material-ui/react-card/#ui-controls
 */
export default function MediaCardWide(props: MediaCardWideArgs): JSX.Element {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  return (
    <Card style={{ display: 'flex', ...props.style }}>
      <Grid container>
        <Grid item xs={12} md={7}>
          <CardContent>
            <Typography color='text.primary' variant='h5' fontWeight='bold' align='left' gutterBottom>
              {props.title}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' align='left' gutterBottom>
              {props.description}
            </Typography>
            {(props.isShowMore ?? false) && (
              <Link
                href={props.showMoreLink ?? '/'}
                rel='noopener noreferrer'
                target='_blank'
                style={{ textDecoration: 'none', color: theme.palette.primary.main }}
              >
                &gt;&gt; show more
              </Link>
            )}
          </CardContent>
        </Grid>
        <Grid item xs={12} md={5}>
          <div style={{ position: 'relative', width: '100%', height: matches ? '500px' : '100%' }}>
            <Image
              fill
              src={props.image}
              alt='symbol シンボル nem card content image card content image'
              sizes={props.imageHeight}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
