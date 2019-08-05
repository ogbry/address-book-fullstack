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
	},
	paper: {
		overflowX: 'auto',
		overflowY: 'auto',
		width: '100%',
		height: '75vh',
		marginTop: '20px',	
		['@media (max-width:450px)']: {
         height: '55vh',
       },
	},
	card: {
	    width: '250px',
	    margin: '10px',
	    
	},
	  wrapper: {
	  	display: 'flex',
	    flexWrap: 'wrap',
	    flexDirection: 'row',
	    alignItems: 'flex-start',
	    justifyContent: 'flex-start',
	    ['@media (max-width:450px)']: {
         height: '70vh',
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

			contacts: [],
			open: false,
			fName: '', lName: '', homePhone: '', mobilePhone: '', workPhone: '', email: '', city: '', stateOrProvince: '', postalCode: '', country: '',
		}
	}


	componentDidMount(){
			const uId = localStorage.getItem('id');

	        axios.get(`http://localhost:3001/addressbook/` +uId)
	        
	        .then(result => {
	        	
	        	this.setState({
	        		contacts: result.data
	        	})
	    })
	}

	handleOpenDialog = (id) => {

		axios.get(`http://localhost:3001/addressbook/view/` +id)
		.then(result => {
	        	
	        	this.setState({

	        		fName: result.data.first_name, 
	        		lName: result.data.last_name, 
	        		homePhone: result.data.home_phone, 
	        		mobilePhone: result.data.mobile_phone, 
	        		workPhone: result.data.work_phone, 
	        		email: result.data.email, 
	        		city: result.data.city, 
	        		stateOrProvince: result.data.state_or_province, 
	        		postalCode: result.data.postal_code, 
	        		country: result.data.country 

	        		})

	        	})
		this.setState({
			open: true,
		})
	}

	handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/addressbook/delete/` +id)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
                if(err.response.status === 401){
                    this.props.history.push('/')
                }
            })
	}


  render() {

  	const {classes} = this.props

  	 
    return (

    	<Container maxWidth="xl" className={classes.root} >
    	<Grid container className={classes.wrapper}>
    	{

    		this.state.contacts.map( item => (
    				
	    			<Card key={item.contactid} className={classes.card}>
	    			
				        <CardContent>
				        <Grid
						  container
						  direction="row"
						  justify="flex-start"
						  alignItems="center"
						>	
							<ContactPhone style={{fontSize: '1.5em', color: '#3f51b5'}} /> &nbsp;
				          <Typography style={{fontSize: '.7em', }} gutterBottom variant="h5" component="h2">
				            {item.first_name}   {item.last_name}
				          </Typography>
				          </Grid>
				          <Typography variant="body2" color="textSecondary">
				            {item.mobile_phone}
				          </Typography>
				        </CardContent>
					      <CardActions >
					        <Button size="small" color="primary" 
					        	onClick={() => this.handleOpenDialog(item.id)}
					         >
					          More
					        </Button>
					        <Button size="small" color="primary">
					          Edit
					        </Button>
					        <Button size="small" color="primary"
					        	onClick={() => this.handleDelete(item.id)}
					        >
					          Remove
					        </Button>
					      </CardActions>
				    </Card>
				  
    			))
    		

		}    		
	    </Grid> 
	    		<Dialog fullWidth maxWidth="sm" open={this.state.open}   aria-labelledby="form-dialog-title">
			        <DialogTitle id="form-dialog-title">View</DialogTitle>
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
				            id="standard-read-only-input"
				            value={this.state.fName}
				            label="First Name"
				            type="text"
				            InputProps={{
					          readOnly: true,
					        }}
				          />

				          <TextField
				          	className={classes.textField}
				            margin="dense"
				            id="standard-read-only-input"
				            value={this.state.lName}
				            label="Last Name"
				            type="text"
				            InputProps={{
					          readOnly: true,
					        }}
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
				            type="number"
				            id="standard-read-only-input"
				            value={this.state.mobilePhone}
				            InputProps={{
					          readOnly: true,
					        }}
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="standard-read-only-input"
				            value={this.state.workPhone}
				            InputProps={{
					          readOnly: true,
					        }}
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
				            id="standard-read-only-input"
				            value={this.state.homePhone}
				            InputProps={{
					          readOnly: true,
					        }}
				            label="Home Phone Number"
				            type="number"
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="standard-read-only-input"
				            value={this.state.email}
				            InputProps={{
					          readOnly: true,
					        }}
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
				            id="standard-read-only-input"
				            value={this.state.city}
				            InputProps={{
					          readOnly: true,
					        }}
				            label="City"
				            type="text"
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="standard-read-only-input"
				            value={this.state.stateOrProvince}
				            InputProps={{
					          readOnly: true,
					        }}
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
				            id="standard-read-only-input"
				            value={this.state.postalCode}
				            InputProps={{
					          readOnly: true,
					        }}
				            label="Postal Code"
				            type="number"
				          />

				          <TextField
				            className={classes.textField}
				            margin="dense"
				            id="standard-read-only-input"
				            value={this.state.country}
				            InputProps={{
					          readOnly: true,
					        }}
				            label="Country"
				            type="text"
				          />

				      </Grid>

			        </DialogContent>
			        <DialogActions>
			          <Button onClick={() => this.setState({
	                 		open: false,
	                 })} color="primary">
			            Close
			          </Button>
			        </DialogActions>
			    </Dialog>
	    </Container>


    )

  }
}

export default withStyles(styles)(AdressBookTable);
