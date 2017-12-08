import React from 'react';
import { withStyles } from 'material-ui/styles';
import Plot from './plot.jsx';
import Paper from 'material-ui/Paper';
import bucketByHour from '../dataHandeling/bucketByHour.js';
import Typography from 'material-ui/Typography';

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
  },
  axisLabels: {
    color: "red"
  }
});

const plotOptions = {
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

/* ----- PlotSheet component is responsible for taking data for individual plot, transforming it and
sending data and Flot configuration variables to Plot component for graph to render -----  */
export class PlotSheetByHour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      plotOptions: plotOptions
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('plot sheet by hour is being rendered')
    this.setState({data: bucketByHour(nextProps.data)});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.sheet}>
        <Typography type="title" align="left" className={classes.title}>Average Trip Grouped By Hour</Typography>
        <Plot data={this.state.data} plotOptions={this.state.plotOptions} plotID={this.props.plotID} className={classes.plot}/>
        <div className={classes.control}>control box here</div>
      </Paper>
    );
  }
}

export default withStyles(styles)(PlotSheetByHour);