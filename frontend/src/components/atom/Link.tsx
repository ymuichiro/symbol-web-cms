import styled from '@mui/material/styles/styled';
import MuiLink from '@mui/material/Link';

const Link = styled(MuiLink)(() => {
  return {
    textDecoration: 'none',
  };
});

export default Link;
