import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import { Modal, Form, Table, Input, Upload, Icon, message, Button } from 'antd';
import _ from 'lodash';
import Cookies from 'js-cookie';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import { getCreateColumns } from '../utils';
import { UPLOAD_PIC, CACHE_TOKEN, CACHE_UID } from '../../data';
import styles from '../style.less';
import { getOrderInfo, getWithdrawBankList } from '../../service';
import * as tools from '@/utils/tools';

const { TextArea } = Input;
const FormItem = Form.Item;

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

function renderTable(self: any) {
  const columns = getCreateColumns(self);
  const { orderInfo } = self.state;
  const keys = Object.keys(orderInfo);
  const { paymentName, channelName, merchantCode, userName } = orderInfo;
  const data = keys
    ? [
        {
          paymentName,
          channelName,
          merchantCode,
          userName,
          amount: 0,
          payeeName: '',
          payeeBankId: '',
        },
      ]
    : [{}];

  return (
    <Table
      className={styles.tableContainer}
      size="small"
      bordered
      rowKey={(record: any, index: number) => String(index)}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
}

class CreateDetailDialog extends React.PureComponent<PropType, StateType> {
  public state = {
    uploadApi: `${UPLOAD_PIC}?token=${Cookies.get(CACHE_TOKEN)}&uid=${Cookies.get(CACHE_UID)}`,
    fileList: [],
    isUpload: false,
    previewVisible: false,
    previewImage: '',
    orderInfo: {
      orderId: undefined,
      amount: undefined,
      userName: undefined,
    }, // 订单信息
    bankList: [], // 银行卡列表
  };

  private handlePreview = async (file: any) => {
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  };

  private handleUploadSuccess = (response: any) => {
    if (response && response.data) {
      const { data } = response;
      const { fileList } = this.state;
      const files = [...fileList];
      files.push({ uid: data, url: data });
      this.setState({
        fileList: files,
        isUpload: false,
      });
    }
  };

  private handleRemove = (data: any) => {
    const { uid } = data;
    const { fileList } = this.state;
    const files = [...fileList];
    const index = _.findIndex(files, (o: any) => o.uid === uid);
    files.splice(index, 1);
    this.setState({
      fileList: files,
    });
  };

  // 获取订单详情
  private getInfo = (): void => {
    getOrderInfo({ orderId: this.state.orderInfo.orderId }).then(({ code, data }) => {
      if (code === 1 && data) {
        if (data.amount) delete data.amount;
        this.setState({ orderInfo: data });
        const { channelId } = data;
        if (channelId) this.getBankList({ channelId });
      }
    });
  };

  // 获取银行卡
  private getBankList = (params: object): void => {
    getWithdrawBankList(params).then(({ code, data }) => {
      if (code === 1 && data) {
        const { bankList } = this.state;
        this.setState({ bankList: data });
      }
    });
  };

  private handleSubmit = () => {
    const { fileList, orderInfo, isUpload } = this.state;
    if (isUpload) {
      // 图片上传中，请稍后再试！
      message.error(formatMessage({ id: 'recharge-repair.img-uploading-warning' }));
      return;
    }
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const tableSaveData = {
          userAccount: orderInfo.userName,
          relationOrderId: orderInfo.orderId,
          amount: orderInfo.amount,
          payeeName: orderInfo.payeeName,
          payeeBankId: orderInfo.payeeBankId,
        };
        const attachments = _.map(fileList, (item: any) => item.url).join(',');
        this.props.confirm(tools.handleSendData({ ...values, ...tableSaveData, attachments }));
      }
    });
  };

  okBtnAvailable = () => {
    const { fileList, orderInfo } = this.state;
    const { orderId, amount } = orderInfo;
    this.props.form.validateFields((err: any, values: any) => {
      if (!err && fileList.length > 0 && orderId && amount) {
        return true;
      }
      return false;
    });
  };

  render() {
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { uploadApi, fileList, previewVisible, previewImage, orderInfo, isUpload } = this.state;
    const remark = this.props.form.getFieldValue('remark');
    const { orderId, amount } = orderInfo;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        {/* 上传 */}
        <div className="ant-upload-text">{formatMessage({ id: 'recharge-repair.upload-btn' })}</div>
      </div>
    );
    const okBtnAvailable = remark && orderId && amount && fileList.length > 0 && !isUpload;

    return (
      <Modal
        visible={visible}
        width={1200}
        title={formatMessage({ id: 'recharge-repair-create-dialog.modal-title' })}
        onCancel={this.props.cancle}
        onOk={this.handleSubmit}
        okButtonProps={{ disabled: !okBtnAvailable }}
        okText={formatMessage({ id: 'recharge-repair.confirm-btn' })}
        cancelText={formatMessage({ id: 'recharge-repair.cancel-btn' })}
      >
        {renderTable(this)}
        <Form>
          {/* 备注 */}
          <FormItem label={<FormattedMessage id="recharge-repair-create-dialog.form-remark" />}>
            {getFieldDecorator('remark', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'recharge-repair-create-dialog.form-remark-required',
                  }),
                },
              ],
            })(<TextArea rows={4} />)}
          </FormItem>
        </Form>

        <h4>
          {/* 上传转账凭证截图： */}
          <span className={styles.tip}>*</span>
          {formatMessage({ id: 'recharge-repair-create-dialog.img-upload-title' })}
        </h4>
        <Upload<>
          action={uploadApi}
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onSuccess={this.handleUploadSuccess}
          onRemove={this.handleRemove}
          beforeUpload={() => {
            this.setState({
              isUpload: true,
            });
            return true;
          }}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        {isUpload ? (
          // 图片上传中...
          <p>{formatMessage({ id: 'recharge-repair-create-dialog.img-upload-status' })}...</p>
        ) : null}

        <Modal
          width={1000}
          visible={previewVisible}
          footer={null}
          onCancel={() => {
            this.setState({ previewVisible: false });
          }}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>
    );
  }
}

const CreateDetailDialogContainer = Form.create({ name: 'createDialog' })(CreateDetailDialog);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(CreateDetailDialogContainer),
);
