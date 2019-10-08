import React, { Fragment } from 'react';

import { Icon } from 'antd';
import styles from './style.less';

const ErrorBox = (props: any) => {
  const { errorMsg, show, hide, faildStr } = props;
  return (
    <Fragment>
      {show ? (
        <div className={styles.errorWrap}>
          <h2>
            <span>
              {' '}
              <Icon type="warning" style={{ color: 'red' }} /> 异常提示 !{' '}
            </span>
            <Icon type="close" style={{ fontSize: '16px', cursor: 'pointer' }} onClick={hide} />
          </h2>
          <p>{errorMsg} </p>
          {faildStr ? <p>{faildStr}</p> : null}
        </div>
      ) : null}
    </Fragment>
  );
};

export default ErrorBox;
