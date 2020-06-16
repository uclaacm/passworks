import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Post from './Post/Post.js';
import profilePic from '../../images/profilePic.png';
import instaLogo from '../../images/instaLogo.png';
import penguin from '../../images/penguin.jpg';
const username = 'jas0nlovescatz';

const posts = [
  {
    username: username,
    profileImg: profilePic,
    location: 'Antarctica',
    likes: 93,
    caption: 'Home sweet home <3',
    image: penguin,
    date: 'Dec 9, 2010'
  },
  {
    username: username,
    profileImg: profilePic,
    location: 'Antarctica',
    likes: 93,
    caption: 'Home sweet home <3',
    image: penguin,
    date: 'Dec 9, 2010'
  },
  {
    username: username,
    profileImg: profilePic,
    location: 'Antarctica',
    likes: 93,
    caption: 'Home sweet home <3',
    image: penguin,
    date: 'Dec 9, 2010'
  },
  {
    username: username,
    profileImg: profilePic,
    location: 'Antarctica',
    likes: 93,
    caption: 'Home sweet home <3',
    image: penguin,
    date: 'Dec 9, 2010'
  },
  {
    username: username,
    profileImg: profilePic,
    location: 'Antarctica',
    likes: 93,
    caption: 'Home sweet home <3',
    image: penguin,
    date: 'Dec 9, 2010'
  },
];

const useStyles = makeStyles({
	header: {
    background: 'azure',
    top: '0px'
  },
  noBar: {
		'&::-webkit-scrollbar': {
			width: '0em'
		},
		'scrollbar-width': 'none'
  }
});

export default function Profile() {
  const classes = useStyles();

  const postList = posts.map(post => {
    return (
      <Post
        profileImg={post.profileImg}
        postImg={post.image}
        poster={post.username}
        caption={post.caption}
        location={post.location}
        date={post.date}
        likes={post.likes}
      />
    );
  });

  return (
    <List className={classes.noBar} style={{maxHeight: '100%', overflow: 'auto', width: '100%'}} subheader={<ListSubheader />} >
      <ListSubheader className={classes.header}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '25px 0px 10px' }}>
          <img src={instaLogo} alt='logo' style={{ 
            float: 'none', width: '50%', marginLeft: 'auto', marginRight: 'auto' }}/>
        </div>
      </ListSubheader>
      {postList}
    </List>
  );
}
