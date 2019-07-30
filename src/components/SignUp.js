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
					<AccountCircle className={classes.marginBottom} style={{color: 'grey', fontSize: '60px',}} />
					
				    
				    <TextField className={classes.marginBottom}
				        id="outlined-dense"
				        required
				        fullWidth
				        label="First Name"
				        variant="outlined"
				      />

				    <TextField className={classes.marginBottom}
				        id="outlined-dense"
				        required
				        fullWidth
				        label="Last Name"
				        variant="outlined"
				      />

					<TextField className={classes.marginBottom}
				        id="outlined-dense"
				        required
				        label="Email"
				        fullWidth
				        variant="outlined"
				      />

					<TextField className={classes.marginBottom}
				        id="outlined-dense"
				        required
				        label="Username"
				        fullWidth
				        variant="outlined"
				      />
				    
				      <TextField className={classes.marginBottom}
				        id="outlined-dense"
				        required
				        label="Password"
				        type="password"
				        fullWidth
				        variant="outlined"
				      />
				      
				      
				      <Button variant="contained" color="secondary" fullWidth className={classes.button}>
				        Sign Up
				      </Button>
				   </Grid>
				</Container>
			
      </React.Fragment>
    )

  }
}

export default withStyles(styles)(SignUp);
