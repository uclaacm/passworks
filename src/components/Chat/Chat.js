import React from 'react';

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

export default function Chat(props) {
  const chatMessages = messages.map(message => {
    return (
      <div class={message.type + ' messages'}>
        <div class={'message ' + message.pos}>
          {message.contents}
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
