import React from 'react';

import {NavLink} from "react-router-dom";
import axios from 'axios';
//Material-UI imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';


const styles = {	
	inputBox: {
		border: 'solid 1px lightgrey',
		padding: '30px',
		width: '450px',
		marginTop: '50px',
		backgroundColor: '#f0f0f0',
		['@media (max-width:450px)']: {
         width: '95%',
         marginTop: '50px',
       },
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

class SignIn extends React.Component<Props, State>{


	constructor(){
		super();

		this.state = {
			uName: '',
	       	pWord: '',
	       	userTextfield: false,
	       	passwordTextfield: false,
	       	userhelperText: ' ',
	       	passhelperText: ' ',
	       	username: '',
	       	password: '',
	       	displayValue: 'none',
	       	errorType: '',
		}
	}

	 
		handldeUserField = (event) => {

		  if(event.target.value.length <= 0){
		    this.setState({
		      userTextfield: true,
		      userhelperText: 'Username is required',
		      uName:event.target.value,
		    })
		  }
		  else{
		    this.setState({
		      userTextfield: false,
		      userhelperText: ' ',
		      uName:event.target.value,
		    })
		  }
		}

		hanldePassField = (event) => {

		  if(event.target.value.length <= 0){
		    this.setState({
		      passwordTextfield: true,
		      passhelperText: 'Password is required',
		      pWord: event.target.value,
		    })
		  }
		  else{
		    this.setState({
		      passwordTextfield: false,
		      passhelperText: ' ',
		      pWord: event.target.value,
		    })
		  }
		}

		
		
		formSubmission(e){
			e.preventDefault();

			axios.post('http://localhost:3001/signin', {

				username: this.state.username,
				password: this.state.password,
				
				

			})
			.then( res => {
				console.log(res.data)
				if(res.data.error === undefined){
					this.props.history.push('/')

					localStorage.setItem('token', res.data.token)
					localStorage.setItem('id', res.data.id)

					window.location.reload(true);
				}
				else if(res.data.error === 'Incorrect Password'){
					this.setState({
						displayValue: 'flex',
						errorType: 'Password is Incorrect',

					})
				}
				else if(res.data.error === 'Incorrect Password'){
					this.setState({
						displayValue: 'flex',
						errorType: 'Username is Incorrect',

					})
				}
				else {
					this.setState({
						displayValue: 'flex',
						errorType: 'User not registered, Click Sign Up',

					})
				}
			})
		}

		componentDidMount(){
			if(localStorage.getItem('token') != null){
				this.props.history.push('/');
			}
			else{
				this.props.history.push('/signin')
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
					<NavLink to='/signin' exact activeStyle={{borderBottom: 'solid 1px'}} className={classes.link}><Typography style={{color: 'grey',}}>
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
					<AccountCircle className={classes.marginBottom} style={{color: '#3f51b5', fontSize: '60px'}} />
				    
					<form noValidate autoComplete="off"  
             		 onSubmit={(e) => this.formSubmission(e)}
             		  >
					<TextField 
						onBlur={(event) => this.handldeUserField(event)}
						error={this.state.userTextfield}
				        required
				        id="standard-required"
				        label="Username"
				        helperText={this.state.userhelperText}
				        fullWidth
				        variant="outlined"
				        margin="normal"
				        onChange={(e) => this.setState({
				        	username: e.target.value
				        })}
				      />
				    
				      <TextField className={classes.marginBottom}
				        onBlur={(event) => this.hanldePassField(event)} 
				        error= {this.state.passwordTextfield}
				        label="Password"
				        helperText={this.state.passhelperText}
				        type="password"
				        required
				        id="standard-required"
				        fullWidth
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	password: e.target.value
				        })}
				      />
				    
				      
				      <Button variant="contained" type='submit' color="primary" fullWidth className={classes.button} >
				        LogIn
				      </Button>


				      <Grid
						  container
						  justify="center"
						  alignItems="center"
						  style={{marginTop: '10px'}}
						>

						<FormHelperText id="component-error-text" style={{color: 'red', display: `${ this.state.displayValue }`}}>{this.state.errorType}</FormHelperText>

				      </Grid>
				      </form>
				   </Grid>

				    
				</Container>
			
      </React.Fragment>
    )

  }
}

export default withStyles(styles)(SignIn);
