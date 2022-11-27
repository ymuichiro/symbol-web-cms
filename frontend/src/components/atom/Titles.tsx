import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  align?: 'center' | 'right' | 'left' | 'inherit' | 'justify';
}

export const PageTitle: React.FC<Props> = (props) => {
  const xssMatches = useMediaQuery('@media screen and (min-width:300px)');
  return (
    <Typography
      gutterBottom
      variant={xssMatches ? 'h3' : 'h4'}
      component={'h1'}
      align={props.align ?? 'left'}
      fontWeight='bold'
      style={{ marginTop: '5vh', overflow: 'hidden', ...props.style }}
    >
      {props.children}
    </Typography>
  );
};
export const SubTitle: React.FC<Props> = (props) => {
  const xssMatches = useMediaQuery('@media screen and (min-width:300px)');

  return (
    <Typography
      gutterBottom
      variant={xssMatches ? 'h4' : 'h5'}
      component={'h2'}
      align={props.align ?? 'left'}
      fontWeight='bold'
      style={{ marginTop: '10px', overflow: 'hidden', ...props.style }}
    >
      {props.children}
    </Typography>
  );
};

export const SectionTitle: React.FC<Props> = (props) => {
  const xssMatches = useMediaQuery('@media screen and (min-width:300px)');

  return (
    <Typography
      gutterBottom
      variant={xssMatches ? 'h5' : 'h6'}
      component={'h2'}
      align={props.align ?? 'left'}
      fontWeight='bold'
      style={{ marginTop: '10px', overflow: 'hidden', ...props.style }}
    >
      {props.children}
    </Typography>
  );
};
