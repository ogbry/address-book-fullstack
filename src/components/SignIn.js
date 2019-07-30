import React from 'react';

import {NavLink} from "react-router-dom";
//Material-UI imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {	
	inputBox: {
		border: 'solid 1px lightgrey',
		padding: '30px',
		width: '450px',
		marginTop: '50px',

	},
	marginBottom: {
		marginBottom: '20px',
	},
	button: {
		padding: '10px',
	},
	link: {
		textDecoration: 'none',
	}
}

class SignIn extends React.Component{


	constructor(){
		super();

		this.state = {
			username: '',
	       	password: '',
	       	userTextfield: false,
	       	passwordTextfield: false,
	       	userhelperText: ' ',
	       	passhelperText: ' ',

		}
	}

	 
	handldeUserField = (event) => {

		  if(event.target.value.length <= 0){
		    this.setState({
		      userTextfield: true,
		      userhelperText: 'Username is required',
		      username:event.target.value,
		    })
		  }
		  else{
		    this.setState({
		      userTextfield: false,
		      userhelperText: ' ',
		      username:event.target.value,
		    })
		  }
		}

		hanldePassField = (event) => {

		  if(event.target.value.length <= 0){
		    this.setState({
		      passwordTextfield: true,
		      passhelperText: 'Password is required',
		      password: event.target.value,
		    })
		  }
		  else{
		    this.setState({
		      passwordTextfield: false,
		      passhelperText: ' ',
		      password: event.target.value,
		    })
		  }
		}
	
  render() {

  	const {classes} = this.props

    return (
      <React.Fragment>
        

			<Container className={classes.inputBox}>
				<Grid
				  container 
				  direction="row"
				  justify="space-around"
				  alignItems="center"
				  className={classes.marginBottom}
				>	
					<NavLink to='/' exact activeStyle={{borderBottom: 'solid 1px'}} className={classes.link}><Typography style={{color: 'grey',}}>
					        Sign In
					</Typography></NavLink>
					
					<NavLink to={'/signup'} activeStyle={{borderBottom: 'solid 1px'}} className={classes.link}><Typography style={{color: 'grey',}}>
					        Sign Up
					</Typography></NavLink>
				</Grid>

				<Grid
				  container
				  direction="column"
				  justify="center"
				  alignItems="center"
				>	
					<AccountCircle className={classes.marginBottom} style={{color: 'grey', fontSize: '60px'}} />
				    
					
					<TextField 
						onBlur={(event) => this.handldeUserField(event)} 
						error={this.state.userTextfield}
				        id="outlined-dense"
				        required
				        label="Username"
				        helperText={this.state.userhelperText}
				        fullWidth
				        variant="outlined"
				        margin="normal"
				      />
				    
				      <TextField className={classes.marginBottom}
				        id="outlined-dense"
				        onBlur={(event) => this.hanldePassField(event)} 
				        error= {this.state.passwordTextfield}
				        required
				        label="Password"
				        helperText={this.state.passhelperText}
				        type="password"
				        fullWidth
				        variant="outlined"
				      />
				    
				      
				      <Button variant="contained" color="primary" fullWidth className={classes.button} >
				        LogIn
				      </Button>

				   </Grid>

				    

				</Container>
			
      </React.Fragment>
    )

  }
}

export default withStyles(styles)(SignIn);
