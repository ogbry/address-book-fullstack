import React from 'react';
import axios from 'axios';

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
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
	root: {
		fontSize: 'calc(0.75em + 1vmin)',
	},
	title: {
		fontSize: '1.2em',
	},
	addIcon: {
		fontSize: '1.45em',
		cursor: 'pointer', 
		border: 'solid 3px', 
		borderRadius: '100px',
		color: 'white',
	},
	exitIcon: {
		fontSize: '1.8em', 
		cursor: 'pointer',
		color: 'white',
	},
	textField: {
		['@media (max-width:552px)']: {
         width: '100%',
       },
	}
}


class AddressBook extends React.Component<Props, State>{


	constructor(){
		super();

		this.state = {

			open: false,
			fName: '',
			lName: '',
			mobile_phone: '',
			work_phone: '',
			home_phone: '',
			email: '',
			city: '',
			state_or_province: '',
			postal_code: '',
			country: '',
			firstNameError: false,
			errorMessege: ' ',
			formHelper: 'none',
			contacts: [],
			query: 'ASC',
			searchVal: '',
			groups: [],
		}
	}



	componentDidMount(){
		this.getData();
		this.reloadData();
	}

	getData = () => {
		const uId = localStorage.getItem('id');

	        axios.get(`http://localhost:3001/addressbook/${uId}?sort=${this.state.query}`)
	        
	        .then(result => {
	        	this.setState({
	        		contacts: result.data
	        	})
	        	return result
	   	 	})
	   	 	.then(x=> {
	   	 		axios.get(`http://localhost:3001/grouplist/${uId}`)
	        
				        .then(result => {
				        	this.setState({
				        		groups: result.data
				        	})
				    })
	   	 	})
	}


	reloadData = () => {
		const token = localStorage.getItem('token')

		const getId = localStorage.getItem('id')


		if(token != null) {
			this.props.history.push('/')
		}
		else{
			this.props.history.push('/signin')
		}
	}

	selectFilter = (e) =>{
		this.setState({
			query: e,
		} , () => {
			this.getData();
		})
	}

	search = (e) => {
	    this.setState({
	      searchVal: '',
	    })
	}

	handleSearch = (event) => {
	    this.setState({
	      searchVal: event.target.value
	    })
	}


	logout(e){

		this.props.history.push('/signin')
    	localStorage.clear()
	}

	formCreateContact(e){
		e.preventDefault();

		const id = localStorage.getItem('id')

		if(this.state.fName <= 0){

			 this.setState({
			 	firstNameError: true,
			 	errorMessege: 'First Name is required',
			 	formHelper: 'flex',
			 	helperColor: 'red'
			 })
		}

		else{
			axios.post('http://localhost:3001/createcontact' , {

				id: id,
				first_name: this.state.fName,
				last_name: this.state.lName,
				home_phone: this.state.home_phone,
				mobile_phone: this.state.mobile_phone,
				work_phone: this.state.work_phone,
				email: this.state.email,
				city: this.state.city,
				state_or_province: this.state.state_or_province,
				postal_code: this.state.postal_code,
				country: this.state.country,

			}).then(res => {
				this.getData();
				this.setState({
					errorMessege: 'Contact Added',
			 		formHelper: 'flex',
			 		helperColor: 'black',
			 		fName: '',
					lName: '',
					mobile_phone: '',
					work_phone: '',
					home_phone: '',
					email: '',
					city: '',
					state_or_province: '',
					postal_code: '',
					country: '',
				})
			})
			.catch(err => {
		      console.error(err);
		    }); 
		}
	}	

  render() {

  	const {classes} = this.props

    return (
    	<React.Fragment>
    	<Container maxWidth='xl' className={classes.outer} >
    		
    		<FilterTool selectFilter={this.selectFilter} query={this.state.query} search={this.search} handleSearch={this.handleSearch} searchVal={this.state.searchVal}/>
	          
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
	                <IconButton onClick={() => this.setState({
	                 		open: true,
	                 })}>
	                 <Add className={classes.addIcon} />
	                 </IconButton>
	                 </Tooltip>
	                 <Tooltip title="Logout">
	                 <IconButton onClick={(e) => this.logout(e)}>
	                 <ExitToApp  className={classes.exitIcon} />
	                 </IconButton>
	                 </Tooltip>
	                </Box>
	                </Grid>
	              </Toolbar>

	           </AppBar>

	           <AddressBookTable getData={this.getData} contacts={this.state.contacts} search={this.search} handleSearch={this.handleSearch} searchVal={this.state.searchVal} groups={this.state.groups}/>

	            <Dialog fullWidth maxWidth="sm" open={this.state.open}   aria-labelledby="form-dialog-title">
			        <DialogTitle id="form-dialog-title">New Contact</DialogTitle>

			        <form noValidate autoComplete="off"  
             		 	onSubmit={(e) => this.formCreateContact(e)} >
			        <DialogContent >

			          <Grid
						  container 
						  direction="row"
						  justify="space-around"
						  alignItems="center"
						>
						  

				           <TextField 
				            className={classes.textField}
					        required
				        	id="standard-required"
					        error={this.state.firstNameError}
					        label="First Name"
					        value={this.state.fName}
					        onChange={(e) => this.setState({
				        	fName: e.target.value
				        })}
					      />

				          <TextField
				          	className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Last Name"
				            type="text"
				            value={this.state.lName}
				            onChange={(e) => this.setState({
				        	lName: e.target.value
				        })}
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
				            type="text"
				            value={this.state.mobile_phone}
				            onChange={(e) => this.setState({
				        	mobile_phone: e.target.value
				        })}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Work Phone Number"
				            value={this.state.work_phone}
				            type="text"
				            onChange={(e) => this.setState({
				        	work_phone: e.target.value
				        })}
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
				            value={this.state.home_phone}
				            label="Home Phone Number"
				            type="text"
				            onChange={(e) => this.setState({
				        	home_phone: e.target.value
				        })}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Email"
				            value={this.state.email}
				            type="email"
				            onChange={(e) => this.setState({
				        	email: e.target.value
				        })}
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
				            value={this.state.city}
				            onChange={(e) => this.setState({
				        	city: e.target.value
				        })}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="State/Province"
				            type="text"
				            value={this.state.state_or_province}
				            onChange={(e) => this.setState({
				        	state_or_province: e.target.value
				        })}
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
				            value={this.state.postal_code}
				            label="Postal Code"
				            type="text"
				            onChange={(e) => this.setState({
				        	postal_code: e.target.value
				        })}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="name"
				            label="Country"
				            value={this.state.country}
				            type="text"
				            onChange={(e) => this.setState({
				        	country: e.target.value
				        })}
				          />
				          

				      </Grid>

				      <FormHelperText id="component-error-text" style={{color: `${ this.state.helperColor }`, marginTop: '15px', justifyContent: 'center', display: `${ this.state.formHelper }`}}>{this.state.errorMessege}</FormHelperText>

			        </DialogContent>
			        <DialogActions>

			          <Button type='submit' color="primary">
			            Add
			          </Button>
			          <Button onClick={() => this.setState({
	                 		open: false,
	                 })} color="primary">
			            Cancel
			          </Button>
			         
			        </DialogActions>
			        </form>
			    </Dialog>



	    </Container>

		</React.Fragment>
    )
  }
}

export default withStyles(styles)(AddressBook);
