import asyncComponent from '../common/AsyncComponent/asyncComponent';

const HomeRouter = [
  {
    path: '/home',
    component: asyncComponent(() => import(/* webpackChunkName: 'home'*/ "../components/home/index")),
    children: []
  }
];

export default HomeRouter;