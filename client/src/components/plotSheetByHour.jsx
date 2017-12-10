/* ----- PlotSheet component is responsible for taking data for individual plot, transforming it and
sending data and Flot configuration variables to Plot component for graph to render -----  */

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Plot from './plot.jsx';
import { convertSpeed } from '../dataHandeling/helperFunctions.js';
import Controls from './controls.jsx';
import Paper from 'material-ui/Paper';
import { bucketByHour } from '../dataHandeling/bucketByHour.js';
import Typography from 'material-ui/Typography';
import { getSettings } from '../dataHandeling/fetchData.js';

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

export class PlotSheetByHour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yAxisLabel: 'Elapsed Time (sec)',
      yAxisToggle: true,
      distance: 1
    }
    this.timeSpeedToggle = this.timeSpeedToggle.bind(this);
    this.distanceChange = this.distanceChange.bind(this);
  }

  componentDidMount() {
    getSettings((data) => {
      this.setState({yAxisLabel: data[this.props.plotID].yAxisLabel, distance: data[this.props.plotID].distance});
      if (data[this.props.plotID].yAxisLabel !== 'Elapsed Time (sec)') {
        this.setState({yAxisToggle: false});
      };
      if (this.props.data !== null) {
        timeSpeedToggle(this.state.yAxisToggle, this.state.distance);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.yAxisLabel === 'Speed (mph)') {
      this.setState({data: convertSpeed(bucketByHour(nextProps.data), this.state.distance)});
    } else {
      this.setState({data: bucketByHour(nextProps.data)});
    }
  }

  timeSpeedToggle(checked, distance) {
    let data = bucketByHour(this.props.data);
    if (checked) {
      this.setState({data: data, yAxisLabel: 'Elapsed Time (sec)', yAxisToggle: true});
    } else {
      data = convertSpeed(data, distance);
      this.setState({data: data, yAxisLabel: 'Speed (mph)', yAxisToggle: false});
    }
  }

  distanceChange(distance) {
    let data = convertSpeed(bucketByHour(this.props.data), distance);
    this.setState({data: data, distance: distance});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.sheet}>
        <Typography type='title' align='left' className={classes.title}>Average Trip Grouped By Hour</Typography>
        <Plot data={this.state.data} yAxisLabel={this.state.yAxisLabel} plotOptions={plotOptions} plotID={this.props.plotID} className={classes.plot}/>
        <Controls distanceChange={this.distanceChange} timeSpeedToggle={this.timeSpeedToggle} plotID={this.props.plotID} checked={this.state.yAxisToggle} distance={this.state.distance}/>
      </Paper>
    );
  }
}

export default withStyles(styles)(PlotSheetByHour);