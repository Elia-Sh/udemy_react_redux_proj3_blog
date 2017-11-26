import React, { Component } from 'react';

export default class App extends Component {
  // this.props.children means that nested routes will be passed to the component as this.props.children,
  // from: https://www.udemy.com/react-redux/learn/v4/t/lecture/4419854?start=0
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
