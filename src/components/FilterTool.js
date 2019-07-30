import React from 'react';

import {NavLink} from "react-router-dom";

import {withStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const styles = {
	formControl: {
		fontSize: 'calc(0.75em + 1vmin)',
		marginTop: '80px',
		['@media (max-width:552px)']: {
         display: 'flex',
         justifyContent: 'center',
       },
		
	},
	textField: {
		marginLeft: '20px',
		['@media (max-width:552px)']: {
         margin: '0',
       },
	},


}


class FilterTool extends React.Component{


	constructor(){
		super();

		this.state = {


		}
	}
  render() {

  	const {classes} = this.props

    return (
    	
    	<React.Fragment>

    	
    		<Box className={classes.formControl}>
    		<Grid
				container 
				direction="row"
				justify="flex-start"
				alignItems="center"
				>
	          <FormControl>
		        <InputLabel htmlFor="age-simple">Sort By Last Name</InputLabel>
		        <Select style={{width: '200px'}}
		          value="Sort"
		        >
		          <MenuItem value={10}>Ten</MenuItem>
		          <MenuItem value={20}>Twenty</MenuItem>
		        </Select>
		      </FormControl>

		    <TextField
				className={classes.textField}
				  	margin="dense"
					id="name"
				    label="Search by First Name"
				   	type="text"
				/>
	
			</Grid>	
			</Box>
		</React.Fragment>
    )

  }
}

export default withStyles(styles)(FilterTool);
