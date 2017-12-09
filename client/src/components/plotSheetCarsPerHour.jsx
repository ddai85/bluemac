import React from 'react';
import { withStyles } from 'material-ui/styles';
import Plot from './plot.jsx';
import { convertSpeed } from '../dataHandeling/helperFunctions.js';
import Controls from './controls.jsx';
import Paper from 'material-ui/Paper';
import { carsPerBucket } from '../dataHandeling/bucketByHour.js';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  sheet: {
    margin: '0 auto',
    'margin-bottom': '25px',
    padding: '20px',
    width: '800px',
    height: '450px'
  },
  control: {
    'padding-top': '20px',
    float: 'left'
  },
  title: {
    'padding-left': '50px'
  }
});

const plotOptions = {
  series: {
    bars: {
      show: true
    },
    color: '#37C24A'
  },
  axisLabels: {
    show: true
  },
  xaxis: {
    show: true,
    position: 'bottom',
    mode: 'time',
    timezone: 'browser',
    timeformat: '%b %d',
    tickSize: [1, 'day'],
    font: {
      family: 'Roboto, sans-serif',
      color: 'black'
    }
  },
  yaxis: {
    axisLabelUseCanvas: true,
    axisLabelFontFamily: 'Roboto, sans-serif',
    axisLabelPadding: 10,
    font: {
      family: 'Roboto, sans-serif',
      color: 'black'
    }
  }
};

/* ----- PlotSheet component is responsible for taking data for individual plot, transforming it and
sending data and Flot configuration variables to Plot component for graph to render -----  */
export class PlotSheetCarsPerHour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yAxisLabel: 'Number of Cars'
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: carsPerBucket(nextProps.data)});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.sheet}>
        <Typography type='title' align='left' className={classes.title}>Cars per Hour</Typography>
        <Plot data={this.state.data} yAxisLabel={this.state.yAxisLabel} plotOptions={plotOptions} plotID={this.props.plotID} className={classes.plot}/>
      </Paper>
    );
  }
}

export default withStyles(styles)(PlotSheetCarsPerHour);