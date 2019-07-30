import React from 'react';

import {NavLink} from "react-router-dom";


import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Contacts from '@material-ui/icons/Contacts'

const styles = {
  
}



class Header extends React.Component{


  constructor(){
    super();

    this.state = {


    }
  }
  render() {

    const {classes} = this.props
      

    return (

      
      <React.Fragment>

      <Container maxWidth='xl'>
          <AppBar fullWidth position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <Contacts />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Address Book
                </Typography>
                <Button color="inherit"></Button>
              </Toolbar>
            </AppBar>
      </Container>

    </React.Fragment>
    )

  }
}

export default withStyles(styles)(Header);
