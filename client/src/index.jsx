import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PlotSheet from './components/plotSheet.jsx';
import PlotSheetByHour from './components/plotSheetByHour.jsx';
import Header from './components/header.jsx';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { getData } from './data-handeling/fetchData.js';

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
      trafficData: null
    };
  }

  componentDidMount() {
    getData((data) => {
      this.setState({trafficData: data});
    })
  }


  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <PlotSheet data={this.state.trafficData} plotID="2"/>
        <PlotSheetByHour data={this.state.trafficData} plotID="1"/>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
