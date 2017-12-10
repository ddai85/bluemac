/* ----- Index is entry point for webapp and calls all the individual subcomponents ----- */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PlotSheet from './components/plotSheet.jsx';
import PlotSheetByHour from './components/plotSheetByHour.jsx';
import PlotSheetCarsPerHour from './components/plotSheetCarsPerHour.jsx';
import Header from './components/header.jsx';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { getData, getSettings } from './dataHandeling/fetchData.js';

import deepOrange from 'material-ui/colors/deepOrange';
import blue from 'material-ui/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
  status: {
    danger: 'red',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trafficData: null,
      settings: []
    };
  }

/* ----- getData function fetches data once from server and passes down to individual plots ----- */
  componentDidMount() {
    getData((data) => {
      this.setState({trafficData: data});
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <PlotSheet data={this.state.trafficData} plotID={0}/>
        <PlotSheetByHour data={this.state.trafficData} plotID={1}/>
        <PlotSheetCarsPerHour data={this.state.trafficData} plotID={2}/>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
