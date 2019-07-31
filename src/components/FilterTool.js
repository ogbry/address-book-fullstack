import React from 'react';



import {withStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const styles = {
	


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

    	
    		<Grid
			  container
			  spacing={2}
			  direction="row"
			  justify="flex-start"
			  alignItems="center"
			  style={{marginTop: '80px',}}
			>
				 <Grid item lg={2} xs={12} >
			          <FormControl style={{width: '100%'}}>
			        <InputLabel htmlFor="age-simple">Sort By Last Name</InputLabel>
			        <Select
			          value="Sort"
			        >
			          <MenuItem value={10}>Ten</MenuItem>
			          <MenuItem value={20}>Twenty</MenuItem>
			        </Select>
			      </FormControl>
			        </Grid>

			        <Grid item lg={2} xs={12} >
			           <TextField
			           style={{width: '100%',}}
						className={classes.textField}
					  	margin="dense"
						id="name"
					    label="Search by Name"
					   	type="text"
					/>
			        </Grid>

			</Grid>
    		
			
		</React.Fragment>
    )

  }
}

export default withStyles(styles)(FilterTool);
