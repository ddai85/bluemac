import React from 'react';
import { withStyles } from 'material-ui/styles';
import Plot from './plot.jsx';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  sheet: {
    margin: "0 auto",
    "margin-bottom": "25px",
    padding: "20px",
    width: "800px",
    height: "400px"
  },
  control: {
    "margin-left": "20px",
    float: "left"
  }
});

export class PlotSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.sheet}>
            <Plot data={this.props.data} plotID={this.props.plotID} className={classes.plot}/>
            <div className={classes.control}>control box here</div>
      </Paper>
    );
  }
}

export default withStyles(styles)(PlotSheet);