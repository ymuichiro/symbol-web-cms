import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Item {
  title: string;
  subtitle: string;
  body: string;
  icon: string;
  background: string;
  more: string;
}

export interface FunctionsPresensArgs {
  items: Item[];
}

interface Args {
  item: Item;
  isFocus: boolean;
}

const ItemCard = ({ item, isFocus }: Args): JSX.Element => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const xssMatches = useMediaQuery('@media screen and (min-width:450px)');
  return (
    <Card
      style={{
        width: '100%',
        maxWidth: '80vw',
        border: `2px solid ${isFocus ? theme.palette.primary.main : theme.palette.background.paper}`,
        minHeight: matches ? '140px' : undefined,
        height: '100%',
      }}
    >
      <CardContent>
        <Grid container justifyContent={'stretch'} spacing={3}>
          <Grid
            item
            xs={xssMatches ? 2 : 12}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Avatar alt={item.title} src={item.icon} />
          </Grid>
          <Grid
            item
            xs={xssMatches ? 10 : 12}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
          >
            <Typography
              variant={xssMatches ? 'body1' : 'body2'}
              color='Highlight'
              fontWeight='bold'
              align='left'
              gutterBottom
            >
              {item.title}
            </Typography>
            <Typography variant={xssMatches ? 'caption' : 'body2'} color='textSecondary' align='left' gutterBottom>
              {item.subtitle}
            </Typography>
            <Link href={item.more} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              Learn more <IoChevronForwardOutline fontSize='small' />
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

interface SwitcherArgs {
  items: Item[];
  currentIndex: number;
  onClick: (index: number) => void;
}

const Switcher = (props: SwitcherArgs): JSX.Element => {
  return (
    <div style={{ width: '100%', paddingLeft: '20px', paddingRight: '20px' }}>
      <Slider centerMode afterChange={props.onClick} infinite speed={500} centerPadding='20px'>
        {props.items.map((item, index) => (
          <ItemCard key={index} item={item} isFocus={props.currentIndex === index} />
        ))}
      </Slider>
    </div>
  );
};

interface ItemListArgs {
  items: Item[];
  currentIndex: number;
  onClick: (index: number) => void;
}

const ItemList = (props: ItemListArgs): JSX.Element => (
  <>
    {props.items.map((item, index) => (
      <ButtonBase
        aria-label={item.title}
        key={index}
        style={{ width: '100%', maxWidth: '80vw' }}
        onClick={() => props.onClick(index)}
      >
        <ItemCard item={item} isFocus={props.currentIndex === index} />
      </ButtonBase>
    ))}
  </>
);

export default function FunctionsPresens(props: FunctionsPresensArgs): JSX.Element {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const matches2 = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const onClickCard = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {matches ? (
            <Switcher items={props.items} currentIndex={currentIndex} onClick={onClickCard} />
          ) : (
            <ItemList items={props.items} currentIndex={currentIndex} onClick={onClickCard} />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Card
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              minHeight: matches ? '400px' : undefined,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${props.items[currentIndex].background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                opacity: 0.08,
              }}
            />
            <CardContent
              style={{
                height: '100%',
                paddingTop: matches2 ? '3rem' : '2rem',
                paddingLeft: matches2 ? '3rem' : '2rem',
                paddingRight: matches2 ? '3rem' : '2rem',
              }}
            >
              <Typography variant='body2' color='textPrimary' style={{ lineHeight: '1.5rem' }}>
                {props.items[currentIndex].body}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
