import React, { Component } from 'react';
import { isDevEnvironment } from '../../utils/util';
import ErrorShow from '../ErrorShow/index';

/**
 * Error Boundaries 可以捕获在其子组件树里抛出的任何错误，打印这些错误，并且返回一个展示错误的界面而不是崩溃掉的页面。
 * Error Boundaries 可以在渲染过程中、在生命周期方法中、以及其子组件的 constructor 中捕获错误
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    let isDev = isDevEnvironment();
    // 开发环境下不捕获错误
    if (!isDev) {
      window.sessionStorage.setItem('catchError', `${error}`);
      window.sessionStorage.setItem('catchErrorInfo', JSON.stringify(info));
      this.setState({ hasError: true })
    }
  }
  render() {
    if (this.state.hasError) {
      return <ErrorShow />
    } else {
      return (
        <div className="error-boundary">
          {this.props.children}
        </div>
      )
    }
  }
}