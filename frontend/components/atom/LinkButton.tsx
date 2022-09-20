import Button from '@mui/material/Button';
import { CSSProperties, FC, ReactNode } from 'react';

type LinkButtonArgs = {
  fullWidth?: boolean;
  size?: 'small' | 'large' | 'medium';
  href: string;
  isNewTab?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
};

const LinkButton: FC<LinkButtonArgs> = (props: LinkButtonArgs) => {
  if (props.isNewTab === true) {
    return (
      <Button
        size={props.size}
        fullWidth={props.fullWidth}
        href={props.href}
        style={props.style}
        variant="contained"
        LinkComponent="a"
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button
        size={props.size}
        fullWidth={props.fullWidth}
        href={props.href}
        style={props.style}
        variant="contained"
        LinkComponent="a"
      >
        {props.children}
      </Button>
    );
  }
};

export default LinkButton;
