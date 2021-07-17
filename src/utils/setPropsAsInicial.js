import React, { Component } from 'react';

export const setPropsAsInicial = (WrappedComponent) =>
  class extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} initialValues={this.props.data} enableReinitialize />
      );
    }
  };
