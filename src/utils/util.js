// 判断当前是否是开发环境
export function isDevEnvironment() {
  let isDev = false;
  let location = window.location;
  let hostname = location.hostname;
  if (hostname == 'localhost' || hostname == '127.0.0.1') {
    isDev = true
  }
  return isDev;
}
