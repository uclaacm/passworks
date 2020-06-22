import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import commonPws from '../../constants/common.json';
const commonPasswords = new Set(commonPws);

const useStyles = () => ({
	inputText: {
		margin: '4px', 
		padding: '8px',
		borderRadius: '4px',
		fontFamily: '"Chivo"',
		fontSize: '1em'
	}
});

class CommonPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      password: '',
      inputLength: 0,
      inputError: false,
      errorString: 'Please enter a password with 4 or more characters'
    };
  }

  handleInputChange = event => {
    this.setState({value: event.target.value, inputLength: event.target.value.length});
  }

  handleInputSubmit = event => {
    event.preventDefault();
    if (this.state.inputLength < 4) {
      this.setState({ password: '', value: '', inputLength: 0, inputError: true });
    } else {
      this.setState({ password: this.state.value, value: '', inputError: false });
    }
  }

  renderResult = () => {
    if (this.state.password === '') {
      return null;
    } else {
      if (commonPasswords.has(this.state.password)) {
        return (
          <Typography variant={'body1'} style={{ textAlign: 'center' }}>
            Oh no! The password you typed is in the top 10,000 most common passwords.
          </Typography>
        );
      } else {
        return (
          <Typography variant={'body1'} style={{ textAlign: 'center' }}>
            Yay! The password you typed is not in the top 10,000 most common passwords.
          </Typography>
        );
      }
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <>
        <form onSubmit={this.handleInputSubmit}>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <input type='text' className={classes.inputText}
              value={this.state.value} onChange={this.handleInputChange} />
            <Typography color='error' style={{ textAlign: 'center' }}>
              {this.state.inputError ? this.state.errorString : null}
            </Typography>
            <Button disableRipple variant='contained' disableElevation type='submit'>Submit</Button>
          </Box>
        </form>
        {this.renderResult()}
      </>
    );
  }
}

export default withStyles(useStyles)(CommonPassword);