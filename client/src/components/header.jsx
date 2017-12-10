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
    height: '100px'
  },
  banner: {
    height: '100px'
  },
  title: {
    'padding-top': '27px'
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
        <Paper position='static' className={classes.banner}>
          <Typography className={classes.title} type='display1' align='center' color='primary'> BlueMAC Traffic Visualization Sample </Typography>
        </Paper>
    </div>
    );
  }
}

export default withStyles(styles)(Header);