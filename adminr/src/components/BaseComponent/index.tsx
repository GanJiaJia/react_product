import React from 'react';
import { StateType } from '@/common-typings';

function injectUnount(target: any, ...rest: any) {
  const next = target.prototype.componentWillUnmount;
  // eslint-disable-next-line
  target.prototype.componentWillUnmount = function() {
    if (next) {
      next.call(this, ...rest);
    }
    this.unmount = true;
  };
  const { setState } = target.prototype;
  // eslint-disable-next-line
  target.prototype.setState = function(...args: any) {
    if (this.unmount) {
      return;
    }
    setState.call(this, ...args);
  };
}

@injectUnount
export default class BaseComponent extends React.PureComponent<StateType> {}
