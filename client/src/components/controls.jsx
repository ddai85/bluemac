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
      yaxisToggle: true,
      yaxisLabel: 'Elapsed Time',
      distance: 1
    };
    this.handleDistanceChange = this.handleDistanceChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  handleChange(field) {
    return (event, checked) => {
      if (checked !== undefined) {
        this.setState({
          [field]: checked,
          yaxisLabel: checked ? 'Elapsed Time' : 'Speed'
        });
        this.props.timeSpeedToggle(checked, this.state.distance);
      } else {
        this.setState({
          [field]: event.target.value,
        });
      }
    }
  };
  
  handleDistanceChange() {
    this.props.distanceChange(this.state.distance);
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography type='subheading'>Plot Controls</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.yaxisToggle}
              onChange={this.handleChange('yaxisToggle')}
              aria-label='yaxisToggle'
              />
            }
          label={this.state.yaxisLabel}
        >
        </FormControlLabel>
        <br/>
        {!this.state.yaxisToggle &&
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
        {!this.state.yaxisToggle &&
        <Button raised dense className={classes.button} onClick={this.handleDistanceChange}>
          Change
        </Button>
        }
        {/* <br/>
        <Select
            value={0}
            // onChange={this.handleChange}
            input={<Input name='age' id='age-simple' />}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}

      </div>
    );
  }
}

export default withStyles(styles)(Controls);