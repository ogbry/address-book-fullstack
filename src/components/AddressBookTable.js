import React from 'react';
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ContactPhone from '@material-ui/icons/ContactPhone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Edit from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const styles = {
	root: {
		fontSize: 'calc(0.75em + 1vmin)',
		border: 'solid 1px lightgrey',
		marginTop: '20px',
		height: '80vh',
		backgroundColor: '#f0f0f0',
		['@media (max-width:450px)']: {
         height: '70vh',
       },
       overflowX: 'auto',
		overflowY: 'auto',
	},
	card: {
  		width: '300px',
	    margin: '10px',
	    border: 'solid 1px lightgrey',
	    ['@media (max-width:1013px)']: {
         flexGrow: 1,
       },
	},
	  wrapper: {
	  	border: 'solid 1px lightgrey',
	  	display: 'flex',
	    flexWrap: 'wrap',
	    flexDirection: 'row',
	    alignItems: 'flex-start',
	    justifyContent: 'flex-start',
	    ['@media (min-width:450px)']: {
         height: 'auto',
       },
	},
	textField: {
		['@media (max-width:552px)']: {
         width: '100%',
       },
	},
	groupGrid: {
		overflow: 'auto', 
		height: '40vh', 
		border: 'solid 1px lightgrey', 
		backgroundColor: '#f1f1f1',
		['@media (max-width:950px)']: {
         height: 'auto',
       },
	},

}

class AdressBookTable extends React.Component{
	constructor(){
		super();

		this.state = {

			open: false,
			fName: '', lName: '', homePhone: '', mobilePhone: ' ', workPhone: '', email: '', city: '', province: '', postalCode: '', country: '', userId: '',
			disabled: true, 
	        buttonChange: 'Edit',
	        saveDisabled: true,
	        editButton: 'flex',
	        saveButton: 'none',
	        currentId: 0,
	        groupDialog: false,
	        helpertextError: ' ',
	        helperError: false,
	        groupName: '',
	        groupFormHelper: 'none',
	        groups: [],
	        addGroupDialog: false,
	        groupValue: '',
	        contactAddedHelper: 'none',
		}
		this.formSubmitUpdate = this.formSubmitUpdate.bind(this);
		this.formCreateGroup = this.formCreateGroup.bind(this);
		this.formSubmitGroup = this.formSubmitGroup.bind(this);

	}

	handleOpenDialog = (id) => {

		axios.get(`http://localhost:3001/addressbook/view/` +id)
		.then(result => {
	        	
	        	this.setState({
	        		currentId: id,
	        		fName: result.data.first_name, 
	        		lName: result.data.last_name, 
	        		homePhone: result.data.home_phone, 
	        		mobilePhone: result.data.mobile_phone, 
	        		workPhone: result.data.work_phone, 
	        		email: result.data.email, 
	        		city: result.data.city, 
	        		province: result.data.state_or_province, 
	        		postalCode: result.data.postal_code, 
	        		country: result.data.country,
	        		})

	        	})
		this.setState({
			open: true,
		})
	}


	handleGroup = (id) => {


		this.setState({
			addGroupDialog: true,
			currentId: id,
		})
	}

	formSubmitGroup(e){
		const contactId = this.state.currentId		
		const user_id = localStorage.getItem('id')

		axios.patch(`http://localhost:3001/addressbook/addtogroup/${user_id}/${contactId}` , {

				groupid: this.state.groupValue,

		})
		.then(res => {
			this.props.getData();
		});

		this.setState({
			groupValue: '',
			contactAddedHelper: 'flex',
		})
	}


	formSubmitUpdate(e) {

		const contactId = this.state.currentId


		axios.patch(`http://localhost:3001/addressbook/update/` +contactId, {

	        		first_name: this.state.fName, 
	        		last_name: this.state.lName,
	        		home_phone: this.state.homePhone,
	        		mobile_phone: this.state.mobilePhone, 
	        		work_phone: this.state.workPhone,
	        		email: this.state.email,
	        		city: this.state.city,
	        		state_or_province: this.state.province,
	        		postal_code: this.state.postalCode,
	        		country: this.state.country,

	        	})
				.then(res => {
					this.props.getData();
				});

			this.setState({

				saveDisabled: true, 
				editButton: 'flex', 
				saveButton: 'none', 
				disabled: true,

			})
	}

	handleDelete = (id) => {
		const getId = localStorage.getItem('id')
        axios
            .delete(`http://localhost:3001/addressbook/delete/${getId}/${id}`)
            .then(res => {
                this.props.getData();
            })
	}

	

	formCreateGroup(e){
		e.preventDefault();

		if( this.state.groupName.length <= 0){
			 this.setState({
			 	helpertextError: "Can't leave this field blank",
			 	helperError: true,
			 })
		}

		else{
			axios.post('http://localhost:3001/creategroup' , {

				userid: localStorage.getItem('id'),
				group_name: this.state.groupName,

			}).then(res => {
				this.props.getData();
				this.setState({
					groupFormHelper: 'flex',
					groupName: '',
				})
			})
			.catch(err => {
		      console.error(err);
		    }); 
		}
	}

	selectGroup(e){
		this.setState({
			groupValue: e
		})
	}
	

  render() {

  	const {classes} = this.props

    return (

    	<Container maxWidth="xl" className={classes.root} >
    	<Grid container  style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px'}}>
    	<Grid item lg={2} md={3} sm={12} xs={12} className={classes.groupGrid}>
    			
    			<List style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px'}}component="nav" aria-label="main mailbox folders">
						        
						        <Tooltip title="Add New Group" placement="left">
						        	<IconButton style={{padding: '5px'}} onClick={() => this.setState({ groupDialog: true, })}>
						        		<GroupAdd  style={{fontSize: '1.5em', color: 'grey'}}/>
						        	</IconButton>
						        </Tooltip>
				    		</List>
				    		<Divider />

							<ExpansionPanel style={{margin: 0}}>
						        <ExpansionPanelSummary
						          expandIcon={<ExpandMoreIcon />}
						          aria-controls="panel1bh-content"
						          id="panel1bh-header"
						        >
						          <Typography className={classes.heading}>Group Lists</Typography>
						        </ExpansionPanelSummary>
						        <ExpansionPanelDetails>
								 	<Button  fullWidth onClick={() => this.props.getData()}>All
								 	</Button>

								</ExpansionPanelDetails>	
						      		    		
    		{
    			this.props.groups.map( group => (

				    	<ExpansionPanelDetails
				    	 key={group.id}>
						 	<Button onClick={() => this.props.getGroupId(group.id)} fullWidth>{group.group_name}
						 	</Button>
						 	<Tooltip title="Edit Group Name" placement="top">
						 	<IconButton onClick={() => this.props.getEditId(group.id)}>
						 		<Edit className={classes.icon} />
						 	</IconButton>
						 	</Tooltip>
						 	<Tooltip title="Remove Group" placement="top">
						 	<IconButton>
						 		<DeleteOutlinedIcon className={classes.icon} />
						 	</IconButton>
						 	</Tooltip>
						</ExpansionPanelDetails>	

    				))
    		}	
	        </ExpansionPanel>		
    	</Grid>
    	
    	
    	<Grid item lg={9} md={8} sm={12} xs={12} className={classes.wrapper}>
    		
    	{
    		this.props.contacts.filter(contact => contact.first_name.toLowerCase().match(this.props.searchVal.toLowerCase()) || contact.last_name.toLowerCase().match(this.props.searchVal.toLowerCase()))

    		.map( item => (
    				
	    			<Card key={item.contactid} className={classes.card}>
	    			
				        <CardContent>
				        <Grid
						  container
						  direction="row"
						  justify="flex-start"
						  alignItems="flex-start"
						>
							<ContactPhone style={{fontSize: '1.5em', color: '#3f51b5'}} /> &nbsp;
				          <Typography style={{fontSize: '.8em',  wordWrap: 'break-word',}} gutterBottom variant="h5" component="h2">
				           		{item.first_name} {item.last_name}  
				          	</Typography>
				          	</Grid>
				          	<Typography variant="body2" color="textSecondary">
				            {item.mobile_phone}
				          </Typography>
				        </CardContent>
					    <CardActions >
					        <Button style={{fontSize: '.5em'}}  size="small" color="primary" 
					        	onClick={() => this.handleOpenDialog(item.id)}
					         >
					          More
					       	</Button>
					        
					        <Button style={{fontSize: '.5em'}}  size="small" color="primary"
					        	onClick={() => this.handleDelete(item.id)}
					        >
					          Remove
					        </Button>
					        <Button style={{fontSize: '.5em'}}  size="small" color="primary"
					        	onClick={() => this.handleGroup(item.id)}
					        >
					          Add to Group
					        </Button>
					    </CardActions>
				    </Card>
				  
    			))
		}    

	    </Grid> 
	    </Grid>
	    	<form>
	    		<Dialog fullWidth maxWidth="sm" open={this.state.open}   aria-labelledby="form-dialog-title">
			        <DialogTitle id="form-dialog-title">View Contact</DialogTitle>
			        <DialogContent >

			          <Grid
						  container 
						  direction="row"
						  justify="space-around"
						  alignItems="center"
						>
						
				          <TextField
				          	className={classes.textField}
				            margin="dense"
				            value={this.state.fName}
				            label="First Name"
				            type="text"
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		fName: e.target.value
				        	})}
				          />

				          <TextField
				          	className={classes.textField}
				            margin="dense"
				            value={this.state.lName}
				            label="Last Name"
				            type="text"
				            disabled={this.state.disabled}
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
				            label="Mobile Phone Number"
				            type="text"
				            value={this.state.mobilePhone}
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		mobilePhone: e.target.value
				        	})}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            value={this.state.workPhone}
				            label="Work Phone Number"
				            type="text"
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		workPhone: e.target.value
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
				            value={this.state.homePhone}
				            label="Home Phone Number"
				            type="text"
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		homePhone: e.target.value
				        	})}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            value={this.state.email}
				            label="Email"
				            type="email"
				            disabled={this.state.disabled}
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
				            value={this.state.city}
				            label="City"
				            type="text"
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		city: e.target.value
				        	})}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            value={this.state.province}
				            label="State or Province"
				            type="text"
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		province: e.target.value
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
				            value={this.state.postalCode}
				            label="Postal Code"
				            type="text"
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		postalCode: e.target.value
				        	})}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            value={this.state.country}
				            label="Country"
				            type="text"
				            disabled={this.state.disabled}
				            onChange={(e) => this.setState({
				        		country: e.target.value
				        	})}
				          />

				      </Grid>

			        </DialogContent>
			        <DialogActions>
			          <Button style={{ display: `${ this.state.editButton }` }} onClick={() => this.setState({
	                 		disabled: false, saveDisabled: false, editButton: 'none', saveButton: 'flex',
	                 })} color="primary">
			           	Edit
			          </Button>
			          <Button type='submit' style={ { display: `${ this.state.saveButton }` } } disabled={this.state.saveDisabled} color="primary"
			          onClick={this.formSubmitUpdate}
			          >
			           	Save
			          </Button>
			          <Button onClick={() => this.setState({
	                 		open: false,
	                 })} color="primary">
			            Close
			          </Button>
			        </DialogActions>
			    </Dialog>

			    <Dialog open={this.state.groupDialog}>
			    	<DialogTitle>New Group</DialogTitle>
			    		<form onSubmit={(e) => this.formCreateGroup(e)} >
					    	<DialogContent>
					    		<TextField
					            className={classes.textField}
					            helperText={this.state.helpertextError}
					            error={this.state.helperError}
					            margin="dense"
					            value={this.state.groupName}
					            label="Group Name"
					            type="text"
					            onChange={(e) => this.setState({
					        		groupName: e.target.value
					        	})}
					        	InputProps={{
							          startAdornment: (
							            <InputAdornment position="start">
							              <PeopleOutline />
							            </InputAdornment>
							          ),
							        }}
					          />
					    	</DialogContent>
				    	</form>
				    	<FormHelperText style={{display: 'flex', justifyContent: 'center', display: `${ this.state.groupFormHelper }`}}>Group Added</FormHelperText>
				    	<DialogActions>
				    		<Button onClick={this.formCreateGroup} type="submit" color="primary">
					            Add
					          </Button>
				    		<Button onClick={() => this.setState({groupDialog: false, })} color="primary">
					            Close
					          </Button>
				    	</DialogActions>
				    	
			    </Dialog>
			    </form>

			    <Dialog open={this.state.addGroupDialog}>
			    	<DialogTitle> Add to Group </DialogTitle>
				    	<DialogContent>
				    		<FormControl fullWidth variant="outlined" >
						        <InputLabel >
						          Groups
						        </InputLabel>
						        <Select
						          	value={this.state.groupValue}
				          			onChange={(e) => this.selectGroup(e.target.value)}
						        >

						          {
						          	this.props.groups.map(g => (

						          		<MenuItem key={g.id} value={g.id}>{g.group_name}</MenuItem>

						          		))
						          }
						        </Select>
						    </FormControl>
				    	</DialogContent>

				    	<FormHelperText style={{display: 'flex', justifyContent: 'center', display: `${ this.state.contactAddedHelper }`}}>Added to the Group</FormHelperText>

				    	<DialogActions>
					    		<Button color="primary" onClick={this.formSubmitGroup}>
						            Add
						          </Button>
					    		<Button onClick={() => this.setState({addGroupDialog: false, contactAddedHelper: 'none', })} color="primary">
						            Close
						        </Button>
					   	</DialogActions>

			    </Dialog>
	    </Container>

    )

  }
}

export default withStyles(styles)(AdressBookTable);
