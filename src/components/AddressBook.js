import React from 'react';

import AddressBookTable from './AddressBookTable.js';
import FilterTool from './FilterTool.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Contacts from '@material-ui/icons/Contacts';
import Add from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


const styles = {
	root: {
		fontSize: 'calc(0.75em + 1vmin)',

	},
	title: {
		fontSize: '1.2em',
	},
	addIcon: {
		fontSize: '1.45em',
		marginRight: '20px', 
		cursor: 'pointer', 
		border: 'solid 2px', 
		borderRadius: '100px',
	},
	exitIcon: {
		fontSize: '1.8em', 
		cursor: 'pointer',
	},
	textField: {
		['@media (max-width:552px)']: {
         width: '100%',
       },

	}

	
}


class AddressBook extends React.Component{


	constructor(){
		super();

		this.state = {

			open: false,

		}
	}


	componentDidMount(){
		if(localStorage('token') == null ){
			this.props.history.push('/')
		}
		else{
			this.props.history.push('/addressbook')
		}
	}


  render() {

  	const {classes} = this.props
  		

    return (

    	
    	<React.Fragment>

    	

    	<Container maxWidth='xl' className={classes.outer} >
    		
    		<FilterTool />
	          
	    </Container>

	    <Container maxWidth='xl' className={classes.root} >
	    	<AppBar >

	              <Toolbar>
	              <Grid
					  container 
					  direction="row"
					  justify="space-between"
					  alignItems="center"
					  
					>
	              	<Box >
	              	<Grid
					  container 
					  direction="row"
					  justify="space-between"
					  alignItems="center"
					>
	                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
	                  <Contacts />
	                </IconButton>
	                <Typography variant="h6" className={classes.title}>
	                  Address Book
	                </Typography>
	                </Grid>
	                </Box>
	                <Box>
	                <Tooltip title="Add New Contact">
	                 <Add className={classes.addIcon} onClick={() => this.setState({

	                 		open: true,
	                 })}/>
	                 </Tooltip>
	                 <Tooltip title="Logout">
	                 <ExitToApp className={classes.exitIcon} />
	                 </Tooltip>
	                </Box>
	                </Grid>
	              </Toolbar>

	         
	           </AppBar>


	           
	           <AddressBookTable />

	            <Dialog fullWidth maxWidth="sm" open={this.state.open}   aria-labelledby="form-dialog-title">
			        <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
			        <DialogContent >
			          <Grid
						  container 
						  direction="row"
						  justify="space-around"
						  alignItems="center"
						>

				          <TextField
				          	className={classes.textField}
				            autoFocus
				            margin="dense"
				            id="name"
				            label="First Name"
				            type="text"
				            required
				          />

				          <TextField
				          	className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Last Name"
				            type="text"
				          />


				      </Grid>

				      <Grid
						  container 
						  direction="row"
						  justify="space-around"
						  alignItems="center"
						>

				          <TextField
				          	className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Mobile Phone Number"
				            type="number"
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Work Phone Number"
				            type="number"
				          />

				      </Grid>

				      <Grid
						  container 
						  direction="row"
						  justify="space-around"
						  alignItems="center"
						>

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Home Phone Number"
				            type="number"
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Email"
				            type="email"
				          />

				      </Grid>

				      <Grid
						  container 
						  direction="row"
						  justify="space-around"
						  alignItems="center"
						>

				           <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="City"
				            type="text"
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="State/Province"
				            type="text"
				          />
				          
				      </Grid>

				      <Grid
						  container 
						  direction="row"
						  justify="space-around"
						  alignItems="center"
						>

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Postal Code"
				            type="number"
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Country"
				            type="text"
				          />

				          
				          
				      </Grid>

			        </DialogContent>
			        <DialogActions>
			          <Button color="primary">
			            Add
			          </Button>
			          <Button onClick={() => this.setState({
	                 		open: false,
	                 })} color="primary">
			            Cancel
			          </Button>
			        </DialogActions>
			    </Dialog>
	    </Container>


		</React.Fragment>
    )

  }
}

export default withStyles(styles)(AddressBook);
