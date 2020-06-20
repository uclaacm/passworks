import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Divider } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  textMessage: {
    fontSize: '.9em',
    lineHeight: '1.2em'
  }
});

export default function Chat(props) {
  const classes = useStyles();

  const chatMessages = props.messages.map(message => {
    return (
      <div className={message.type + ' messages'}>
        <div className={'message ' + message.pos}>
          <Typography variant='body1' className={classes.textMessage}>
            {message.contents}
          </Typography>
        </div>
      </div>
    );
  });

  return (
    <div className="chat-container">
      <div className="chat">
        <Box display='flex' flexDirection='column' alignItems='center'>
          <AccountCircleIcon style={{ marginTop: '-10', fontSize: '2.2em', color: '#b3b3b3' }}/>
          <Typography variant='body1' style={{ textAlign: 'center' }}>
            Hackerman
          </Typography>
        </Box>
        <Divider style={{ marginTop: 5, marginBottom: 5}}></Divider>
        {chatMessages}
      </div>
    </div>
  )
}
