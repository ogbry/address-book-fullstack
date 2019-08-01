import React from 'react';

import {withStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = {
	root: {
		fontSize: 'calc(0.75em + 1vmin)',
		border: 'solid 1px lightgrey',
		marginTop: '20px',
		height: '80vh',
		backgroundColor: '#f0f0f0',
	},
	paper: {
		overflowX: 'auto',
		overflowY: 'auto',
		width: '100%',
		height: '75vh',
		marginTop: '20px',	}
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


class AdressBookTable extends React.Component{


	constructor(){
		super();

		this.state = {

			contacts: [],

		}
	}


	// componentDidMount(){
 //        fetch(`http://localhost:9000/api/contacts/${localStorage.getItem('userId')}`, {
 //            method: 'GET',
 //            headers:{
 //                'Content-Type': 'application/json',
 //                'Authorization': 'Bearer ' +localStorage.getItem('token'),
 //            }
 //        })
 //        .then(data => data.json())
 //        .then(result => {
 //            this.setState({
 //                contacts: result
 //            })
 //        })
 //    }

  render() {

  	const {classes} = this.props
  		

    return (

    	<Container maxWidth="xl" className={classes.root} >
    		<Paper className={classes.paper}>
	        <Table className={classes.table}>
		        <TableHead>
		          <TableRow>
		            <TableCell>Dessert (100g serving)</TableCell>
		            <TableCell align="right">Calories</TableCell>
		            <TableCell align="right">Fat&nbsp;(g)</TableCell>
		            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
		            <TableCell align="right">Protein&nbsp;(g)</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {rows.map(row => (
		            <TableRow key={row.name}>
		              <TableCell component="th" scope="row">
		                {row.name}
		              </TableCell>
		              <TableCell align="right">{row.calories}</TableCell>
		              <TableCell align="right">{row.fat}</TableCell>
		              <TableCell align="right">{row.carbs}</TableCell>
		              <TableCell align="right">{row.protein}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
		    </Table>
		    </Paper>
	            
	    </Container>


    )

  }
}

export default withStyles(styles)(AdressBookTable);
