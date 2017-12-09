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

/* ----- PlotSheet component is responsible for taking data for individual plot, transforming it and
sending data and Flot configuration variables to Plot component for graph to render -----  */
export class PlotSheetByHour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yAxisLabel: 'Elapsed Time (sec)'
    };
    this.timeSpeedToggle = this.timeSpeedToggle.bind(this);
    this.distanceChange = this.distanceChange.bind(this);
  }
  componentWillMount() {
    getSettings((data) => {
      this.setState({yAxisLabel: data[this.props.plotID].yAxisLabel});
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: bucketByHour(nextProps.data)});
  }

  timeSpeedToggle(checked, distance) {
    let data = bucketByHour(this.props.data);
    if (checked) {
      this.setState({data: data, yAxisLabel: 'Elapsed Time (sec)'});
    } else {
      data = convertSpeed(data, distance);
      this.setState({data: data, yAxisLabel: 'Speed (mph)'});
    }
  }

  distanceChange(distance) {
    let data = convertSpeed(bucketByHour(this.props.data), distance);
    this.setState({data: data});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.sheet}>
        <Typography type='title' align='left' className={classes.title}>Average Trip Grouped By Hour</Typography>
        <Plot data={this.state.data} yAxisLabel={this.state.yAxisLabel} plotOptions={plotOptions} plotID={this.props.plotID} className={classes.plot}/>
        <Controls distanceChange={this.distanceChange} timeSpeedToggle={this.timeSpeedToggle} plotID={this.props.plotID}/>
      </Paper>
    );
  }
}

export default withStyles(styles)(PlotSheetByHour);