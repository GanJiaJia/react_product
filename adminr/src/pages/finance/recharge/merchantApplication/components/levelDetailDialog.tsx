import { Modal, Tag } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import _ from 'lodash';
import { connect } from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { setTimeoutClose } from '../../utils';

interface PropType {
  [propName: string]: any;
}

interface StateType {
  visible: boolean;
}

function renderTag(data: any, levelList: any[]): ReactNode {
  return (
    <Fragment>
      {data.map((item: any) => (
        <Tag key={item} style={{ fontSize: '14px' }}>
          {_.find(levelList, { levelId: item }).name || ''}
        </Tag>
      ))}
    </Fragment>
  );
}

class LevelDetailDialog extends React.PureComponent<PropType, StateType> {
  public state: StateType = {
    visible: false,
  };

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }

  // 延时关闭弹窗，保留动画
  private handleClose = (): void => {
    this.setState({ visible: false });
    setTimeoutClose(() => {
      this.props.cancel();
    });
  };

  render(): ReactNode {
    const { rowData } = this.props;
    const { visible } = this.state;

    let levelId: any = '';
    if (!_.isEmpty(rowData)) {
      if (Number.isNaN(Number(rowData.levelId)) && typeof rowData.levelId === 'string') {
        const levelIdList = rowData.levelId.split(',');
        levelId = _.map(levelIdList, item => Number(item));
      } else {
        levelId = [Number(rowData.levelId)];
      }
    }

    const { levelList } = this.props.recharge.merchantAppData;

    return (
      // 层级类型
      <Modal
        title={formatMessage({ id: 'application.level-title' })}
        visible={visible}
        onOk={this.handleClose}
        onCancel={this.handleClose}
      >
        {/* 已设置支付的层级 */}
        <h4>
          <FormattedMessage id="application.level-has-set-level" />
        </h4>
        {levelList.length && renderTag(levelId, levelList)}
      </Modal>
    );
  }
}

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(LevelDetailDialog),
);
