import React, { ReactNode } from 'react';
import { Modal, Button, Table } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import ImgViewDialog from '../imgViewDialog/index';

import { getLogsBasicColumns, getLogsPersonColumns, getLogsOtherColumns } from './utils';
import { getOrderDetail } from '../../service';
import styles from './style.less';

interface PropType {
  [propName: string]: any;
}

interface StateType {
  orderInfo: any;
  activeIndex: number;
  imgViewDialogVisible: boolean;
}

// 渲染基本信息
function renderBasicTable(data: any): ReactNode {
  return (
    <Table
      className={styles.detailTable}
      style={{ margin: '0 0 10px 0' }}
      size="small"
      bordered
      rowKey={(record: any) => record.orderId}
      columns={getLogsBasicColumns()}
      dataSource={data}
      pagination={false}
    />
  );
}

// 渲染收付款人信息
function renderPersonTable(data: any): ReactNode {
  return (
    <Table
      className={styles.detailTable}
      style={{ margin: '0 0 10px 0' }}
      size="small"
      bordered
      rowKey={(record: any) => record.orderId}
      columns={getLogsPersonColumns()}
      dataSource={data}
      pagination={false}
    />
  );
}

// 渲染其他信息
function renderOtherTable(data: any): ReactNode {
  return (
    <Table
      className={styles.detailTable}
      style={{ margin: '0 0 10px 0' }}
      size="small"
      bordered
      rowKey={(record: any) => record.orderId}
      columns={getLogsOtherColumns()}
      dataSource={data}
      pagination={false}
    />
  );
}

// 渲染凭证截图
function renderImgList(self: any): ReactNode {
  const data = self.state.orderInfo.attachments;

  return data && data.length ? (
    <ul className={styles.imgViewContianer}>
      {data.map((item: string, index: number) => {
        const ele = item ? (
          <li
            key={item}
            onClick={() => {
              self.handleImg(index);
            }}
          >
            <img src={item} alt="" style={{ width: '100%', height: '100%' }} />
          </li>
        ) : null;
        return ele;
      })}
    </ul>
  ) : null;
}

class DetailDialog extends React.PureComponent<PropType, StateType> {
  public state: StateType = {
    orderInfo: {
      attachments: [],
    },
    activeIndex: 0,
    imgViewDialogVisible: false,
  };

  componentDidMount() {
    this.getOrderDetailEffect({ orderId: this.props.rowData.orderId });
  }

  // 获取订单详情
  private getOrderDetailEffect = (params: object) => {
    getOrderDetail(params).then((res: any) => {
      const { code, data } = res;
      if (code === 1 && data) {
        this.setState({ orderInfo: data });
      }
    });
  };

  private handleImg = (index: number) => {
    this.setState({
      activeIndex: index,
      imgViewDialogVisible: true,
    });
  };

  render(): ReactNode {
    const { rowData } = this.props;
    const { orderInfo, imgViewDialogVisible, activeIndex } = this.state;

    return (
      // 订单详情
      <Modal
        title={formatMessage({ id: 'detail-dialog.modal-title' })}
        visible={this.props.visible}
        width={1000}
        onCancel={this.props.close}
        footer={[
          // 关闭
          <Button type="primary" key="close" onClick={this.props.close}>
            <FormattedMessage id="detail-dialog.close-btn" />
          </Button>,
        ]}
      >
        {/* 基本信息 */}
        <h4>
          <FormattedMessage id="detail-dialog.basic-info" />
        </h4>
        {renderBasicTable([rowData])}
        {/* 收付款人信息 */}
        <h4>
          <FormattedMessage id="detail-dialog.recept-info" />
        </h4>
        {renderPersonTable([rowData])}
        {/* 其他信息 */}
        <h4>
          <FormattedMessage id="detail-dialog.other-info" />
        </h4>
        {renderOtherTable([rowData])}
        {/* 转账凭证截图 */}
        {orderInfo.attachments && orderInfo.attachments.length > 0 ? (
          <h3>
            <FormattedMessage id="detail-dialog.trans-pic" />
          </h3>
        ) : null}
        {renderImgList(this)}

        {imgViewDialogVisible ? (
          <ImgViewDialog
            index={activeIndex}
            data={orderInfo.attachments}
            close={() => this.setState({ imgViewDialogVisible: false })}
          />
        ) : null}
      </Modal>
    );
  }
}

export default DetailDialog;
