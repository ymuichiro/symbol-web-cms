import DEFAULT_CAVER_IMAGE from '@/assets/logo/symbol-default-cover-logo.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { CSSProperties } from 'react';

interface Args {
  image?: string;
  title: string;
  description: string;
  date: string;
  locale: string;
  style?: CSSProperties;
  link?: string;
  tweetLink?: string;
}

export default function MediaCard(props: Args): JSX.Element {
  const theme = useTheme();

  // tweet 投稿用URLを生成する
  const createShareLink = (): string => {
    const tweetUrl = 'https://twitter.com/intent/tweet?text=';
    const title = encodeURIComponent(props.title);
    const url = encodeURIComponent(props.tweetLink ?? '');
    const tags = encodeURIComponent('#Symbol #NEM #Blockchain');
    return `${tweetUrl}${title}%0A${url}%0A${tags}`;
  };

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', ...props.style }}>
      <CardMedia
        component={'img'}
        height='200'
        alt='symbol シンボル nem card content image'
        image={props.image ?? `${DEFAULT_CAVER_IMAGE}`}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.title}
        </Typography>
        <Typography variant='body2' color='text.secondary' align='left' gutterBottom>
          {new Date(props.date).toLocaleDateString(props.locale, { timeZone: 'Asia/Tokyo' })}
        </Typography>
        <Divider />
        <Typography variant='body2' color='text.secondary' gutterBottom style={{ marginTop: '1.5rem' }}>
          {props.description.slice(0, 80) + (props.description.length >= 80 ? '...' : '')}
        </Typography>
      </CardContent>
      <CardContent style={{ gap: '1rem', display: 'flex', flexDirection: 'row', marginTop: 'auto' }}>
        <Link href={props.link ?? '/'} style={{ color: theme.palette.primary.main }}>
          View
        </Link>
        <Link
          rel='noopener noreferrer'
          target='_blank'
          href={createShareLink()}
          style={{ color: theme.palette.primary.main }}
        >
          share
        </Link>
      </CardContent>
    </Card>
  );
}
