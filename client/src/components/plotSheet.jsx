/* ----- PlotSheet component is responsible for taking data for individual plot, transforming it and
sending data and Flot configuration variables to Plot component for graph to render -----  */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Plot from './plot.jsx';
import Controls from './controls.jsx';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { convertTime, convertSpeed } from '../dataHandeling/helperFunctions.js';

const styles = theme => ({
  sheet: {
    margin: '0 auto',
    'margin-bottom': '25px',
    padding: '20px',
    width: '800px',
    height: '450px'
  },
  title: {
    'padding-left': '50px'
  }
});

const plotOptions = {
  series: {
    points: {
      radius: 1,
      show: true,
      fill: true,
      fillColor: '#058DC7'
    },
    color: '#058DC7'
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

export class PlotSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yAxisLabel: 'Elapsed Time (sec)'
    };

    this.timeSpeedToggle = this.timeSpeedToggle.bind(this);
    this.distanceChange = this.distanceChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: convertTime(nextProps.data)});
  }

  timeSpeedToggle(checked, distance) {
    let data = convertTime(this.props.data);
    if (checked) {
      this.setState({data: data, yAxisLabel: 'Elapsed Time (sec)'});
    } else {
      data = convertSpeed(data, distance);
      this.setState({data: data, yAxisLabel: 'Speed (mph)'});
    }
  }

  distanceChange(distance) {
    let data = convertTime(convertSpeed(this.props.data, distance));
    this.setState({data: data});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.sheet}>
          <Typography type='title' className={classes.title} align='left'>Raw Data</Typography>
          <Plot data={this.state.data} yAxisLabel={this.state.yAxisLabel} plotOptions={plotOptions} plotID={this.props.plotID} className={classes.plot}/>
          <Controls timeSpeedToggle={this.timeSpeedToggle} distanceChange={this.distanceChange}/>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(PlotSheet);