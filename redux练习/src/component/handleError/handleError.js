import React, { Component } from 'react'

class handleError extends React.Component {   
  constructor(props) {     
    super(props);     
    this.state = { error: false };
  }
  componentDidCatch(error, info) {     
    this.setState({ error, info });
  }
  render() {
    if (this.state.error) {
      return <h1>Error: {this.state.error.toString()}</h1>;
    }
    return this.props.children;   
  } 
}

export default handleError
