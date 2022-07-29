import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CSSProperties } from 'react';
import UtilService from '../../service/UtilService';

interface Args {
  image: string;
  title: string;
  description: string;
  date?: string;
  style?: CSSProperties;
  onClickLink?: () => void;
}

export default function MediaCard(props: Args): JSX.Element {
  return (
    <Card style={props.style}>
      <CardMedia component="img" height="200" image={props.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        {props.date && (
          <Typography variant="body2" color="text.secondary" align="left" gutterBottom>
            {UtilService.formatDate(new Date(props.date), 'yyyy/MM/dd')}
          </Typography>
        )}
        <Divider />
        <div style={{ height: '1rem' }} />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={props.onClickLink}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
