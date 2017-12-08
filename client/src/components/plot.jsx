import React from 'react';
import { withStyles } from 'material-ui/styles';
import $ from 'jquery';
import flot from '../jquery.flot.js';
import flotTime from '../jquery.flot.time.js';
import axislabels from '../jquery.flot.axislabels.js';

const styles = theme => ({
  graph: {
    float: "left",
    "padding-top": "20px"
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
    $.plot($("#" + this.props.plotID), [{data: this.state.data}], this.props.plotOptions);
    const { classes } = this.props;
    return (
      <div className={classes.graph}>
        <div className={classes.canvas} id={this.props.plotID}></div>
      </div>
    );
  }
}

export default withStyles(styles)(Plot);