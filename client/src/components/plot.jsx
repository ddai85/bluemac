import React from 'react';
import { withStyles } from 'material-ui/styles';
import $ from 'jquery';
import flot from '../jquery.flot.js';

const styles = theme => ({
  graph: {
    float: "left"
  },
  canvas: {
    height: "400px",
    width: "600px"
  }
});

class Plot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }
  
  
  render() {
    $.plot($("#" + this.props.plotID), [this.state.data]);
    const { classes } = this.props;
    return (
      <div className={classes.graph}>
        <div className={classes.canvas} id={this.props.plotID}></div>
      </div>
    );
  }
}

export default withStyles(styles)(Plot);