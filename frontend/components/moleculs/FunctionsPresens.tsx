import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Item = {
  title: string;
  subtitle: string;
  body: string;
  icon: string;
  background: string;
  more: string;
};

export interface FunctionsPresensArgs {
  items: Item[];
}

const ItemCard = ({ item, isFocus }: { item: Item; isFocus: boolean }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  return (
    <Card
      style={{
        width: '100%',
        maxWidth: '80vw',
        padding: '1rem 1rem 1rem 0rem',
        border: `2px solid ${isFocus ? theme.palette.primary.main : theme.palette.background.paper}`,
        minHeight: matches ? '140px' : undefined,
      }}
    >
      <Grid container>
        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar src={item.icon} />
        </Grid>
        <Grid item xs={10} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="body1" color="Highlight" fontWeight="bold" align="left" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" align="left" gutterBottom>
            {item.subtitle}
          </Typography>
          <Link href={item.more} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            Learn more <KeyboardArrowRightIcon fontSize="small" />
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

const Switcher = (props: { items: Item[]; currentIndex: number; onClick: (index: number) => void }) => {
  return (
    <Slider centerMode afterChange={props.onClick} dots infinite speed={500} centerPadding="20px">
      {props.items.map((item, index) => (
        <ItemCard key={index} item={item} isFocus={props.currentIndex === index} />
      ))}
    </Slider>
  );
};

const ItemList = (props: { items: Item[]; currentIndex: number; onClick: (index: number) => void }) => (
  <>
    {props.items.map((item, index) => (
      <ButtonBase key={index} style={{ width: '100%', maxWidth: '80vw' }} onClick={() => props.onClick(index)}>
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

  const onClickCard = (index: number) => {
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
              <Typography variant="body2" color="textPrimary" style={{ lineHeight: '1.5rem' }}>
                {props.items[currentIndex].body}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
