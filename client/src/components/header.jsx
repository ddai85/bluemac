import React from 'react';
import $ from 'jquery';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    width: '100%',
    height: "100px"
  },
  toolbar: {
    height: "100px"
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Paper position="static" color="default">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} type="headline" color="primary"> BlueMAC Traffic Visualization Sample </Typography>
        </Toolbar>
      </Paper>
    </div>
    );
  }
}

export default withStyles(styles)(Header);