import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Post from './Post/Post.js';
import profilePic from '../../images/profilePic.png';
import instaLogo from '../../images/instaLogo.png';
import birthday from '../../images/birthday.jpg';
import mufasa from '../../images/mufasa_baby.jpg';
import bridge from '../../images/bridge.jpg';
import dessert from '../../images/dessert.jpg';
import plant from '../../images/plant.jpg';
import takeOne from '../../images/take_one.jpg';
import boba from '../../images/boba.jpg';
import moon from '../../images/moon.jpg';
import decode from '../../images/decode.jpg';
const username = 'jas0nlovescatz';

const posts = [
  {
    username: username,
    profileImg: profilePic,
    location: '',
    likes: 87,
    caption: 'can anyone decode my message?',
    image: decode,
    date: 'May 21, 2020'
  },
  {
    username: username,
    profileImg: profilePic,
    location: 'the moon',
    likes: 112,
    caption: 'i bought a moon lamp!',
    image: moon,
    date: 'Nov 14, 2019'
  },
  {
    username: username,
    profileImg: profilePic,
    location: 'Ichi Tea',
    likes: 94,
    caption: 'boba is <3',
    image: boba,
    date: 'Jul 19, 2019'
  },
  {
    username: username,
    profileImg: profilePic,
    location: '',
    likes: 93,
    caption: 'throwback to when we first brought Mufasa home <3',
    image: mufasa,
    date: 'Dec 9, 2019'
  },
  {
    username: username,
    profileImg: profilePic,
    location: '',
    likes: 156,
    caption: 'another year down! 🥳',
    image: birthday,
    date: 'Feb 3, 2018'
  },
  {
    username: username,
    profileImg: profilePic,
    location: '',
    likes: 98,
    caption: 'dessert is the most important food group',
    image: dessert,
    date: 'Oct 4, 2017'
  },
  {
    username: username,
    profileImg: profilePic,
    location: '',
    likes: 85,
    caption: 'my new succulent :)',
    image: plant,
    date: 'Sep 17, 2016'
  },
  {
    username: username,
    profileImg: profilePic,
    location: '',
    likes: 79,
    caption: '(sadly there were magazines under the cat)',
    image: takeOne,
    date: 'Mar 25, 2015'
  },
  {
    username: username,
    profileImg: profilePic,
    location: 'San Francisco',
    likes: 93,
    caption: 'vacation was fun, but it’s good to be home',
    image: bridge,
    date: 'Aug 21, 2014'
  }
];

const useStyles = makeStyles({
	header: {
    background: 'azure',
    top: '0px'
  }
});

export default function Profile() {
  const classes = useStyles();

  const postList = posts.map((post, i) => {
    return (
      <Post
        profileImg={post.profileImg}
        postImg={post.image}
        poster={post.username}
        caption={post.caption}
        location={post.location}
        date={post.date}
        likes={post.likes}
        key={i}
      />
    );
  });

  return (
    <List style={{ maxHeight: '90%', width: '100%' }} subheader={<ListSubheader />} >
      <ListSubheader className={classes.header}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '25px 0px 10px' }}>
          <img src={instaLogo} alt='logo' style={{ 
            float: 'none', width: '50%', marginLeft: 'auto', marginRight: 'auto' }}/>
        </div>
      </ListSubheader>
      <div style={{ maxHeight: '100%', overflow: 'auto', paddingRight: '5px' }}>
      {postList}
      </div>
    </List>
  );
}
