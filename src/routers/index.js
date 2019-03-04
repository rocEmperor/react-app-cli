import React, { Component } from 'react';
import App from '../App';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import Login from '../common/Login/Login';

let routerList = [];

// 获取router中所有路由配置文件, 遍历合并为一个数组
const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
keys.forEach((item) => {
  item = item.replace('./', '');
  let route = require(`./${item}`).default;
  if (route && Object.prototype.toString.call(route) == '[object Array]') {
    routerList = routerList.concat(route);
  }
})

class Router extends Component {
  render () {
    return (
      <HashRouter>
        <Switch>
          {/* <Route exact path="/" component={Login}/> */}
          <App>
            {routerList.map((route, index) => {
              return <Route exact path={route.path} component={route.component} key={index}/>
            })}
          </App>
        </Switch>
      </HashRouter>
    )
  }
}

export default Router;