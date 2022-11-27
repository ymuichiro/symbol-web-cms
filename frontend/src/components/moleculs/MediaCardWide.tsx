import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

interface MediaCardWideArgs {
  title: string;
  description: string;
  imageUrl: string;
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
                color={theme.palette.primary.main}
                style={{ textDecoration: 'none' }}
              >
                &gt;&gt; show more
              </Link>
            )}
          </CardContent>
        </Grid>
        <Grid item xs={12} md={5}>
          <CardMedia
            component={'img'}
            alt='symbol シンボル nem card content image card content image'
            image={props.imageUrl}
            style={{
              objectFit: 'cover',
              height: matches ? '400px' : '100%',
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
