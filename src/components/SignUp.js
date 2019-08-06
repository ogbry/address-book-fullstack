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
		padding: '10px'
	},
		link: {
		textDecoration: 'none',
	},
	textField: {
		marginBottom: '5px',
	}
}

class SignUp extends React.Component{


	constructor(){
		super();

		this.state = {

			fName: '',
			lName: '',
			email: '',
			username: '',
			password: '',
			successMessege: 'none',
		}
	}


	formSignUp(e){
		e.preventDefault();

		axios.post('http://localhost:3001/signup' , {

			firstname: this.state.fName,
			lastname: this.state.lName,
			email: this.state.email,
			username: this.state.username,
			password: this.state.password

		}).then(res => {

			if(res.data === null){
				console.log('error')
			}
			else{
				this.setState({
					successMessege: 'flex',
					fName: '',
					lName: '',
					email: '',
					username: '',
					password: '',
				})
			}

		})
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
					<AccountCircle className={classes.marginBottom} style={{color: '#f50057', fontSize: '60px',}} />
					
				    <form 
             		 onSubmit={(e) => this.formSignUp(e)} >
             		 

				    <TextField className={classes.textField}
				        fullWidth
				        required
				        margin="normal"
				        value={this.state.fName}
				        id="standard-required"
				        label="First Name"
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	fName: e.target.value
				        })}
				      />

				    <TextField className={classes.textField}
				        label="Last Name"
				        fullWidth
				        required
				        value={this.state.lName}
				        margin="normal"
				        id="standard-required"
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	lName: e.target.value
				        })}
				      />

					<TextField className={classes.textField}
				        label="Email"
				        fullWidth
				        required
				        value={this.state.email}
				        margin="normal"
				        id="standard-required"
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	email: e.target.value
				        })}
				      />

					<TextField className={classes.textField}
				        label="Username"
				        fullWidth
				        required
				        value={this.state.username}
				        id="standard-required"
				        variant="outlined"
				        margin="normal"
				        onChange={(e) => this.setState({
				        	username: e.target.value
				        })}
				      />
				    
				      <TextField style={{marginBottom: '20px'}}
				        label="Password"
				        type="password"
				        fullWidth
				        required
				        value={this.state.password}
				        margin="normal"
				        id="standard-required"
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	password: e.target.value
				        })}
				      />
				      
				      
				      <Button variant="contained" type='submit' color="secondary" fullWidth className={classes.button}>
				        Sign Up
				      </Button>

				      <FormHelperText id="component-error-text" style={{color: 'red', marginTop: '10px', display: `${ this.state.successMessege }`}}>Account Created, Login? Click SIGN IN</FormHelperText>

				      <Grid
						  container
						  justify="center"
						  alignItems="center"
						  style={{marginTop: '10px'}}
						>

				      </Grid>
				      </form>
				   </Grid>
				</Container>
			
      </React.Fragment>
    )

  }
}

export default withStyles(styles)(SignUp);
