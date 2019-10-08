import Cookies from 'js-cookie';
import router from 'umi/router';
// import store from '@/store';

interface DataType {
  token: string;
  userId: string;
}
export function isLogin() {
  const { token, uid } = getLogin();
  return token && uid;
}

export function getLogin() {
  let userInfo = localStorage.getItem('admin-user-info');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  }
  return {
    token: sessionStorage.getItem('admin-token'),
    uid: sessionStorage.getItem('admin-uid'),
    userInfo,
  };
}

export function setLogin(data: DataType) {
  console.log(data);
  Cookies.set('admin-token', data.token);
  Cookies.set('admin-uid', data.userId);
  sessionStorage.setItem('admin-token', data.token);
  sessionStorage.setItem('admin-uid', data.token);
  localStorage.setItem('admin-user-info', JSON.stringify(data));
}

export function logout() {
  Cookies.remove('admin-token');
  Cookies.remove('admin-uid');
  sessionStorage.removeItem('admin-token');
  sessionStorage.removeItem('admin-uid');
  localStorage.removeItem('admin-user-info');
  localStorage.removeItem('permissionList');
  router.push('/user/login');
}
