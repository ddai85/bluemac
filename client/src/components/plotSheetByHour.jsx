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
import { getSettings, saveSettings } from '../dataHandeling/fetchData.js';

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

    this.updateData = this.updateData.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDistanceValue = this.handleDistanceValue.bind(this);
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  componentWillMount() {
    let context = this;
    getSettings((settings) => {
      context.setState({yAxisLabel: settings[this.props.plotID].yAxisLabel, distance: settings[this.props.plotID].distance});
      if (settings[this.props.plotID].yAxisLabel !== 'Elapsed Time (sec)') {
        context.setState({yAxisToggle: false}, this.updateData);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data === null) {
      this.updateData(nextProps.data);
    }
  }

  updateData(data = this.props.data) {
    if (data !== null) {
      data = bucketByHour(data);
      if (this.state.yAxisToggle) {
        this.setState({data: data});
      } else {
        data = convertSpeed(data, this.state.distance);
        this.setState({data: data});
      }
    }
    this.setSettings();
  }

  setSettings() {
    let setting = {};
    setting[this.props.plotID] = {
      yAxisLabel: this.state.yAxisLabel,
      distance: this.state.distance
    }
    saveSettings(setting);
  }

  handleToggle(e, checked) {
    if (checked) {
      this.setState({yAxisToggle: true, yAxisLabel: 'Elapsed Time (sec)'}, this.updateData);
    } else {
      this.setState({yAxisToggle: false, yAxisLabel: 'Speed (mph)'}, this.updateData)
    }
  }

  handleDistanceValue(e) {
    this.setState({distance: e.target.value});
  }

  handleDistanceChange() {
    this.updateData();
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.sheet}>
        <Typography type='title' align='left' className={classes.title}>Average Trip Grouped By Hour</Typography>
        <Plot 
          data={this.state.data} 
          yAxisLabel={this.state.yAxisLabel} 
          plotOptions={plotOptions} 
          plotID={this.props.plotID} 
          className={classes.plot}
        />
        <Controls 
          plotSheet={this.state}
          handleToggle={this.handleToggle}
          handleDistanceValue={this.handleDistanceValue}
          handleDistanceChange={this.handleDistanceChange}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(PlotSheetByHour);