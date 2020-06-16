import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

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
	root: {
    paddingTop: 10
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
    <>
      <Toolbar className={classes.root}>
        <img src={instaLogo} alt='logo' style={{ 
          float: 'none', width: '50%', marginLeft: 'auto', marginRight: 'auto' }}
        />
      </Toolbar>
      <div style={{marginTop: '-15px'}}>{postList}</div>
    </>
  );
}
