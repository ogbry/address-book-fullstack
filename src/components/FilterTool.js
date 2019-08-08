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


class FilterTool extends React.Component<Props, State>{


	constructor(){
		super();

		this.state = {
			groupVal: '',
		}
	}

	groupFilter(e){
		this.setState({
			groupVal: e,
		})
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
				 	<Grid item lg={2} md={2} sm={3} xs={4} >
			          <FormControl style={{width: '100%'}}>
				        <InputLabel htmlFor="age-simple">By Last Name</InputLabel>
				        <Select
				          value={this.props.query}
				          onChange={(e) => this.props.selectFilter(e.target.value)}>
				        >
				          <MenuItem value='ASC'>A-Z</MenuItem>
				          <MenuItem value='DESC'>Z-A</MenuItem>
				        </Select>
				      </FormControl>
			        </Grid>

			        <Grid item lg={2} md={4} sm={4} xs={8} >
			           <TextField
			           style={{width: '100%',}}
						className={classes.textField}
					  	margin="dense"
						id="name"
						value={this.props.groupVal}
					    label="By Name"
					   	type="text"
					   	onChange={(event) => this.props.handleSearch(event)}
					/>
			        </Grid>

			        



			</Grid>
    		
			
		</React.Fragment>
    )

  }
}

export default withStyles(styles)(FilterTool);
