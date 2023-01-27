import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface AvatarListItemsArgs {
  avatar: StaticImageData;
  title: string;
  body: string;
  url: string;
  avatarAlt?: string;
}

export default function AvatarLinkList(props: { items: AvatarListItemsArgs[] }): JSX.Element {
  return (
    <List style={{ width: '100%' }}>
      {props.items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItemButton
            href={item.url}
            alignItems='flex-start'
            LinkComponent={Link}
            rel='noopener noreferrer'
            target='_blank'
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: 'transparent' }}>
                <Image
                  fill
                  src={item.avatar}
                  alt={item.avatarAlt || ''}
                  sizes={'5vw'}
                  style={{ objectFit: 'contain' }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} secondary={item.body} />
          </ListItemButton>
          <Divider variant='inset' component='li' />
        </React.Fragment>
      ))}
    </List>
  );
}
