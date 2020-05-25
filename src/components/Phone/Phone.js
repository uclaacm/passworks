import React from 'react';

class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toptitle: this.props.toptitle,
            postimg: this.props.postimg,
            poster: this.props.poster,
            caption: this.props.caption
        }
    }

    render() {
        return(
            <div className="phoneContainer">
                <div className="phoneScreen">
                    <h2>{this.state.toptitle}</h2>
                    <br/>
                    <img src={this.state.postimg} alt="" width="250" ></img>
                    <p className="insta"><b>{this.state.poster}</b> {this.state.caption}</p>
                </div>
            </div>
        )
    }
}

export default Phone;