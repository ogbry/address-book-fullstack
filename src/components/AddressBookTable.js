import React from 'react';

import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';

const styles = {
	root: {
		fontSize: 'calc(0.75em + 1vmin)',
		border: 'solid 1px lightgrey',
		marginTop: '20px',
		height: '80vh',
	},

}


class AdressBookTable extends React.Component{


	constructor(){
		super();

		this.state = {


		}
	}
  render() {

  	const {classes} = this.props
  		

    return (

    	<Container maxWidth="xl" className={classes.root} >
    		
	          sadasd
	            
	    </Container>


    )

  }
}

export default withStyles(styles)(AdressBookTable);
