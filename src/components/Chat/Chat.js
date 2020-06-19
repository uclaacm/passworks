import React from 'react';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const messages = [
  {
    type: 'sent',
    pos: 'last',
    contents: <>help</>
  },
  {
    type: 'rec',
    pos: '',
    contents: <>yo</>
  },
  {
    type: 'rec',
    pos: '',
    contents: <>what's up</>
  },
  {
    type: 'rec',
    pos: 'last',
    contents: <>u good?</>
  },
  {
    type: 'sent',
    pos: 'last',
    contents: <>I need to learn about passwords</>
  }
];

const useStyles = makeStyles({
  textMessage: {
    fontSize: '.9em',
    lineHeight: '1.2em'
  }
});

export default function Chat(props) {
  const classes = useStyles();

  const chatMessages = messages.map(message => {
    return (
      <div class={message.type + ' messages'}>
        <div class={'message ' + message.pos}>
          <Typography variant='body1' className={classes.textMessage}>
            {message.contents}
          </Typography>
        </div>
      </div>
    );
  });

  return (
    <div class="chat-container">
      <div class="chat">
        {chatMessages}
      </div>
    </div>
  )
}
