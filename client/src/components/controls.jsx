import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { saveSettings } from '../dataHandeling/fetchData.js';


const styles = theme => ({
  container: {
    'padding-top': '20px',
  },
  button: {
    'margin-top': '10px'
  },
  label: {
    width: '1000px'
  }
});

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      yAxisToggle: true,
      yAxisLabel: 'Elapsed Time (sec)',
      distance: 1
    };
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.checked) {
      this.setState({
        yAxisToggle: false,
        yAxisLabel: 'Speed (mph)'
      })
    }
    this.setState({distance: nextProps.distance});
  }

  handleChange(field) {
    return (event, checked) => {
      if (checked !== undefined) {
        let label = checked ? 'Elapsed Time (sec)' : 'Speed (mph)'
        this.setState({
          [field]: checked,
          yAxisLabel: label
        });
        this.props.timeSpeedToggle(checked, this.state.distance);
        let setting = {};
        setting[this.props.plotID] = {
          yAxisLabel: label,
          distance: this.state.distance
        }
        saveSettings(setting);
      } else {
        this.setState({
          [field]: event.target.value,
        });
      }
    }
  };
  
  handleDistanceChange() {
    this.props.distanceChange(this.state.distance);
    let setting = {}
    setting[this.props.plotID] = {
      yAxisLabel: this.state.yAxisLabel,
      distance: this.state.distance
    }
    saveSettings(setting);
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography type='subheading'>Plot Controls</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.yAxisToggle}
              onChange={this.handleChange('yAxisToggle')}
              aria-label='yAxisToggle'
              />
            }
          label={this.state.yAxisLabel}
        >
        </FormControlLabel>
        <br/>
        {!this.state.yAxisToggle &&
          <TextField
            id='distance'
            helperText='Miles between detectors'
            className={classes.textField}
            value={this.state.distance}
            onChange={this.handleChange('distance')}
            margin='none'
          />
        }
        <br/>
        {!this.state.yAxisToggle &&
        <Button raised dense className={classes.button} onClick={this.handleDistanceChange}>
          Change
        </Button>
        }
      </div>
    );
  }
}

export default withStyles(styles)(Controls);