import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  if (props.isNewTab === true) {
    return (
      <Link href={props.href} locale={router.locale}>
        <Button
          size={props.size}
          fullWidth={props.fullWidth}
          style={props.style}
          variant="contained"
          LinkComponent={'a'}
          href={props.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.children}
        </Button>
      </Link>
    );
  } else {
    return (
      <Link href={props.href} locale={router.locale}>
        <Button
          size={props.size}
          fullWidth={props.fullWidth}
          style={props.style}
          variant="contained"
          LinkComponent={'a'}
          href={props.href}
        >
          {props.children}
        </Button>
      </Link>
    );
  }
};

export default LinkButton;
