import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import { UrlObject } from 'url';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';

interface MediaCardWideArgs {
  title: string;
  description: string;
  imageUrl: string;
  isShowMore?: boolean;
  showMoreLink?: UrlObject | string;
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
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12} md={7} style={{ height: '100%' }}>
          <CardContent>
            <Typography color="text.primary" variant="h5" fontWeight="bold" align="left" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="left" gutterBottom>
              {props.description}
            </Typography>
            {props.isShowMore && (
              <Typography style={{ marginTop: '20px' }}>
                <Link href={props.showMoreLink || '/'}>
                  <a rel="noopener noreferrer" target="_blank" style={{ color: theme.palette.text.primary }}>
                    &gt;&gt; Show more
                  </a>
                </Link>
              </Typography>
            )}
          </CardContent>
        </Grid>
        <Grid item xs={12} md={5}>
          <CardMedia
            component={'img'}
            alt="symbol シンボル nem card content image card content image"
            image={props.imageUrl}
            style={{ height: props.imageHeight, maxHeight: matches ? '400px' : undefined }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
