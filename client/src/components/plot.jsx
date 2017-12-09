/* ----- Plot component renders Flot graph with given props ----- */

import React from 'react';
import { withStyles } from 'material-ui/styles';
import $ from 'jquery';
import flot from '../jquery.flot.js';
import flotTime from '../jquery.flot.time.js';
import axislabels from '../jquery.flot.axislabels.js';

const styles = theme => ({
  graph: {
    float: 'left',
    'padding-top': '20px'
  },
  canvas: {
    height: '400px',
    width: '600px'
  }
});

class Plot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      plotOptions: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    let plotOptions = nextProps.plotOptions;
    plotOptions.yaxis.axisLabel = nextProps.yAxisLabel;
    this.setState({data: nextProps.data, plotOptions: plotOptions});
    
  }
  
  render() {
    $.plot($('#' + this.props.plotID), [{data: this.state.data}], this.state.plotOptions);
    const { classes } = this.props;
    return (
      <div className={classes.graph}>
        <div className={classes.canvas} id={this.props.plotID}></div>
      </div>
    );
  }
}

export default withStyles(styles)(Plot);