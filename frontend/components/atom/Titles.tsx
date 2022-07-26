import Typography from '@mui/material/Typography';
import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  return (
    <Typography gutterBottom variant="h3" component={'h1'} align="left" fontWeight="bold" style={{ marginTop: '5vh' }}>
      {props.children}
    </Typography>
  );
};
export const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  return (
    <Typography gutterBottom variant="h5" component={'h2'} align="left" fontWeight="bold" style={{ marginTop: '10px' }}>
      {props.children}
    </Typography>
  );
};
