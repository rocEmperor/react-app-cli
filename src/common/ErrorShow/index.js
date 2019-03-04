import React from 'react';

class ErrorShow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount () {
    // 清除缓存
    window.sessionStorage.removeItem('catchError');
    window.sessionStorage.removeItem('catchErrorInfo');
  }
  render () {
    let error = window.sessionStorage.getItem('catchError') || '';
    let info = window.sessionStorage.getItem('catchErrorInfo') || '';
    return (
      <div className="error-show">
        <div style={{ fontSize: 30, textAlign: 'center' }}>捕获到错误，页面崩溃了...</div>
        <div className="error">
          发生错误: {error}
        </div>
        <div className="error">
          详细报错信息: {info}
        </div>
      </div>
    )
  }
}

export default ErrorShow;