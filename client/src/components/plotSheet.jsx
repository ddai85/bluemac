/* ----- PlotSheet component is responsible for taking data for individual plot, transforming it and
sending data and Flot configuration variables to Plot component for graph to render -----  */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Plot from './plot.jsx';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { convertTime } from '../dataHandeling/helperFunctions.js';

const styles = theme => ({
  sheet: {
    margin: "0 auto",
    "margin-bottom": "25px",
    padding: "20px",
    width: "800px",
    height: "450px"
  },
  control: {
    "padding-top": "20px",
    float: "left"
  },  
  title: {
    "padding-left": "50px"
  }
});

const plotOptions = {
  series: {
    points: {
      radius: 1,
      show: true,
      fill: true,
      fillColor: "#058DC7"
    },
    color: "#058DC7"
  },
  axisLabels: {
    show: true
  },
  xaxis: {
    show: true,
    position: "bottom",
    mode: "time",
    timezone: "browser",
    timeformat: "%b%d",
    tickSize: [1, "day"],
    font: {
      family: "Roboto, sans-serif",
      color: "black"
    }
  },
  yaxis: {
    axisLabel: 'Elapsed Time (sec)',
    axisLabelUseCanvas: true,
    axisLabelFontFamily: "Roboto, sans-serif",
    axisLabelPadding: 10,
    font: {
      family: "Roboto, sans-serif",
      color: "black"
    }
  }
};

export class PlotSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      plotOptions: plotOptions
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: convertTime(nextProps.data)});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.sheet}>
        <Typography type="title" className={classes.title} align="left">Raw Data</Typography>
        <Plot data={this.state.data} plotOptions={this.state.plotOptions} plotID={this.props.plotID} className={classes.plot}/>
        <div className={classes.control}>control box here</div>
      </Paper>
    );
  }
}

export default withStyles(styles)(PlotSheet);