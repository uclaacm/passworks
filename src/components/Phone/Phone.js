import React from 'react';

class Phone extends React.Component {
    /* just leaving these for filler */
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
            <div class="phone-bezel">
                <div class="phone-screen">
                    <div class="phone-cutout"></div>
                    <div class="phone-content">
                        <h2><i>{this.state.toptitle}</i></h2>
                        <br/>
                        <img src={this.state.postimg} alt="" width="100%" ></img>
                        <p><b>{this.state.poster}</b> {this.state.caption}</p>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Phone;