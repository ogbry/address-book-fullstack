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
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = {
	inputBox: {
		border: 'solid 1px lightgrey',
		padding: '30px',
		width: '450px',
		marginTop: '50px',
		backgroundColor: '#f0f0f0',
	},
	marginBottom: {
		marginBottom: '20px',
	},
	button: {
		padding: '10px'
	},
		link: {
		textDecoration: 'none',
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

		}).then(res => console.log(res.data));

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
					<AccountCircle className={classes.marginBottom} style={{color: 'grey', fontSize: '60px',}} />
					
				    <form noValidate autoComplete="off"  
             		 onSubmit={(e) => this.formSignUp(e)} >
				    <TextField className={classes.marginBottom}
				        required
				        fullWidth
				        label="First Name"
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	fName: e.target.value
				        })}
				      />

				    <TextField className={classes.marginBottom}
				        required
				        fullWidth
				        label="Last Name"
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	lName: e.target.value
				        })}
				      />

					<TextField className={classes.marginBottom}
				        required
				        label="Email"
				        fullWidth
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	email: e.target.value
				        })}
				      />

					<TextField className={classes.marginBottom}
				        required
				        label="Username"
				        fullWidth
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	username: e.target.value
				        })}
				      />
				    
				      <TextField className={classes.marginBottom}
				        required
				        label="Password"
				        type="password"
				        fullWidth
				        variant="outlined"
				        onChange={(e) => this.setState({
				        	password: e.target.value
				        })}
				      />
				      
				      
				      <Button variant="contained" type='submit' color="secondary" fullWidth className={classes.button}>
				        Sign Up
				      </Button>
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
