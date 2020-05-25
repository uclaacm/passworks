import React from 'react';
import Phone from '../Phone/Phone.js';
import succ from "../../successkey.jpg"

class Main extends React.Component {
    render = () => {
        return(
        <div className="mainContainer">
            <div className="item">
                <h1>Passwords</h1>
            </div>
            <Phone toptitle="Finstagram" postimg={succ} poster="hack3rman" caption="lesgooo"> </Phone>
            <div className="item">
                <h1>are k00l</h1>
            </div>
        </div>);
    }
}

export default Main;