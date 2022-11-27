import { NAVIGATIONS } from '@/navigation/Root';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

/**
 * 404 Error page
 */
function ErrorPage(): JSX.Element {
  const navigate = useNavigate();

  const onClickButton = (): void => {
    navigate(NAVIGATIONS.root.path);
  };

  return (
    <>
      <Helmet>
        <title>{`${import.meta.env.VITE_SITE_NAME}: page not found`}</title>
        <meta name='description' content='page not found' />
      </Helmet>
      <div
        style={{
          height: '80vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <Typography variant='h1' component='p' align='center' fontWeight='bold'>
          Page not found
        </Typography>
        <Button variant='text' onClick={onClickButton}>
          Home
        </Button>
      </div>
    </>
  );
}

export default ErrorPage;
