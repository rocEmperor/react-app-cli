import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import './index.less';

export default 
@connect(state => { return { homeModel: state.homeModel } })
@Form.create()
class Home extends React.Component {
  constructor (props) {
    super(props);
    this.clickFn = this.clickFn.bind(this);
  }
  clickFn () {
    this.props.dispatch({
      type: 'homeModel/addCount',
      payload: {}
    })
  }
  render () { 
    const { homeModel } = this.props;
    return (
      <div className="home-container" onClick={this.clickFn}>
        我是{`${homeModel.name} --- ${homeModel.count}`}
      </div>
    )
  }
}
