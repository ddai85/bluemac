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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography type='subheading'>Plot Controls</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={this.props.plotSheet.yAxisToggle}
              onChange={this.props.handleToggle}
              aria-label='yAxisToggle'
            />
            }
          label={this.props.plotSheet.yAxisLabel}
        >
        </FormControlLabel>
        <br/>
        {!this.props.plotSheet.yAxisToggle &&
          <TextField
            id='distance'
            helperText='Miles between detectors'
            className={classes.textField}
            value={this.props.plotSheet.distance}
            onChange={this.props.handleDistanceValue}
            margin='none'
          />
        }
        <br/>
        {!this.props.plotSheet.yAxisToggle &&
        <Button raised dense className={classes.button} onClick={this.props.handleDistanceChange}>
          Change
        </Button>
        }
      </div>
    );
  }
}

export default withStyles(styles)(Controls);