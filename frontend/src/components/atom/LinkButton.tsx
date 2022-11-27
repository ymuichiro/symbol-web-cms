import Button from '@mui/material/Button';
import { CSSProperties, FC, ReactNode } from 'react';

interface LinkButtonArgs {
  fullWidth?: boolean;
  size?: 'small' | 'large' | 'medium';
  href: string;
  isNewTab?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  ariaLabel?: string;
}

const LinkButton: FC<LinkButtonArgs> = (props: LinkButtonArgs) => {
  if (props.isNewTab === true) {
    return (
      <Button
        aria-label={props.ariaLabel ?? 'button'}
        size={props.size}
        fullWidth={props.fullWidth}
        style={props.style}
        variant='contained'
        LinkComponent={'a'}
        href={props.href}
        rel='noopener noreferrer'
        target='_blank'
      >
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button
        size={props.size}
        fullWidth={props.fullWidth}
        style={props.style}
        variant='contained'
        LinkComponent={'a'}
        href={props.href}
      >
        {props.children}
      </Button>
    );
  }
};

export default LinkButton;
