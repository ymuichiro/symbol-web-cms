import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';
import { CSSProperties, FC, ReactNode } from 'react';

interface LinkButtonArgs {
  fullWidth?: boolean;
  size?: 'small' | 'large' | 'medium';
  href: string;
  isNewTab?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  ariaLabel?: string;
  sx?: SxProps<Theme>;
  variant?: 'text' | 'outlined' | 'contained';
}

const LinkButton: FC<LinkButtonArgs> = (props: LinkButtonArgs) => {
  if (props.isNewTab === true) {
    return (
      <Button
        aria-label={props.ariaLabel ?? 'button'}
        size={props.size}
        fullWidth={props.fullWidth}
        style={props.style}
        variant={props.variant || 'contained'}
        LinkComponent={Link}
        href={props.href}
        rel='noopener noreferrer'
        target='_blank'
        sx={props.sx}
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
        variant={props.variant || 'contained'}
        LinkComponent={Link}
        href={props.href}
        sx={props.sx}
      >
        {props.children}
      </Button>
    );
  }
};

export default LinkButton;
