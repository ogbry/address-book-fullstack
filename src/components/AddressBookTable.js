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
  		width: '273px',
	    margin: '10px',
	    border: 'solid 1px lightgrey',
	    ['@media (max-width:680px)']: {
         flexGrow: 1,
       },
	},
	  wrapper: {
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

	}
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
		}
		this.formSubmitUpdate = this.formSubmitUpdate.bind(this);
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

	formSubmitUpdate(e) {

		console.log('edit')
		const contactId = this.state.currentId
		console.log(this.state.fName)
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

					console.log(res.data)
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
		console.log(getId)
        axios
            .delete(`http://localhost:3001/addressbook/delete/${getId}/${id}`)
            .then(res => {
                this.props.getData();
            })
	}

  render() {

  	const {classes} = this.props
  	
    return (

    	<Container maxWidth="xl" className={classes.root} >
    	<Grid container className={classes.wrapper}>
    	{
    		this.props.contacts.filter(contact => contact.first_name.toLowerCase().match(this.props.searchVal.toLowerCase()))

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
					    </CardActions>
				    </Card>
				  
    			))
		}    		
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
			    </form>
	    </Container>

    )

  }
}

export default withStyles(styles)(AdressBookTable);
