import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
// import MainHeader from './common/MainLayout/MainHeader';
// import MainSiderBar from './common/MainLayout/MainSiderBar';
// import './index.less';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <LocaleProvider locale={zhCN}>
        <div className="app">
          {/* <MainHeader />
          <div style={{height: 64}}></div>
          <MainSiderBar /> */}
          <div className="app-content">
            {this.props.children}
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

export default App;