import React, { ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import { Modal, Form, Table, Button, Input, Upload, Icon, message } from 'antd';
import Cookies from 'js-cookie';
import _ from 'lodash';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import { getRepairSysColumns, getRepairMerColumns } from '../utils';
import { checkShowOpt } from '../../utils';
import { UPLOAD_PIC, CACHE_TOKEN, CACHE_UID } from '../../data';
import styles from '../style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

interface StateType {
  [propName: string]: any;
}

interface PropType {
  [propName: string]: any;
}

function optButtonGroup(self: any) {
  const { showOpt } = self.props;
  const { isClick, fileList } = self.state;
  const sucReqRemark = self.props.form.getFieldValue('sucReqRemark');
  const refuseAvailable = isClick && sucReqRemark;
  const confirmAvailable = isClick && fileList.length && sucReqRemark;

  const optArr = [
    // 取消
    <Button key="back" onClick={self.handleDialogClose}>
      {formatMessage({ id: 'recharge-repair.cancel-btn' })}
    </Button>,
    // 确定拒绝
    <Button key="refuse" type="primary" onClick={self.handleRefuse} disabled={!refuseAvailable}>
      {formatMessage({ id: 'recharge-repair.refuse-btn' })}
    </Button>,
    // 确定
    <Button key="submit" type="primary" onClick={self.handleSubmit} disabled={!confirmAvailable}>
      {formatMessage({ id: 'recharge-repair.confirm-btn' })}
    </Button>,
  ];
  const noOptArr = [
    // 确定
    <Button key="back" onClick={self.handleDialogClose}>
      {formatMessage({ id: 'recharge-repair.confirm-btn' })}
    </Button>,
  ];

  return showOpt ? optArr : noOptArr;
}

class RepairDetailDialog extends React.PureComponent<PropType, StateType> {
  public state = {
    systemSendData: {
      dateType: -1,
      userType: -1,
      limitType: -1,
      paymentId: -3,
      searchType: 1,
      keywords: '',
      page: 1,
      size: 20,
    },
    saveData: {
      orderId: '',
      amount: 0,
    },
    systemTableData: [],
    merchantTableData: [{ status: undefined }],
    isClick: false,
    fileList: [],
    uploadApi: `${UPLOAD_PIC}?token=${Cookies.get(CACHE_TOKEN)}&uid=${Cookies.get(CACHE_UID)}`,
    previewVisible: false,
    previewImage: '',
    isUpload: false,
    payeeName: '',
    payeeBankId: '',
  };

  public systemColumns = getRepairSysColumns(this);

  public merchantColumns = getRepairMerColumns(this);

  componentDidMount() {
    const { data } = this.props;
    this.handleCheck(data);
    const dataLength = Object.keys(data).length;
    if (dataLength > 0) {
      this.hanleTableData(data);
    }
  }

  // 处理表格数据
  private hanleTableData = (data: any) => {
    const { orderId, amount } = data;
    const systemTableData = [{ ...data }];
    const saveData = { orderId, amount };
    const obj = { ...this.state, systemTableData, saveData };
    this.setState({ ...obj });
  };

  // 补单确定
  private bindEffects = (values: object) => {
    this.props.dispatch({
      type: 'recharge/repairConfirmEffect',
      payload: {
        ...values,
        ...this.state.saveData,
      },
      callback: () => {
        this.props.form.resetFields();
        this.props.confirm();
      },
    });
  };

  // 补单拒绝
  private refuseEffect = (values: any) => {
    const { orderId } = this.state.saveData;
    values.remark = values.sucReqRemark;
    delete values.sucReqRemark;
    this.props.dispatch({
      type: 'recharge/repairRefuseEffect',
      payload: {
        ...values,
        orderId,
      },
      callback: () => {
        this.props.form.resetFields();
        this.props.confirm();
      },
    });
  };

  // 补单保存
  private handleSubmit = () => {
    const { isUpload, fileList, payeeBankId, payeeName } = this.state;
    if (isUpload) {
      // 图片正在上传中，请稍后再试
      message.error(formatMessage({ id: 'recharge-repair.img-uploading-warning' }));
      return;
    }
    if (fileList.length === 0) {
      // 请先上传转账凭证！
      message.error(formatMessage({ id: 'recharge-repair-detail-dialog.certificate-warning' }));
      return;
    }
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const attachments = _.map(this.state.fileList, (item: any) => item.url).join(',');
        this.bindEffects({ ...values, attachments, payeeBankId, payeeName });
      }
    });
  };

  // 补单拒绝
  private handleRefuse = () => {
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.refuseEffect(values);
      }
    });
  };

  private handleCheck = (record: any) => {
    this.props.dispatch({
      type: 'recharge/checkMerchantStatusEffect',
      payload: { orderId: record.orderId },
      callback: (response: any) => {
        const { code, data } = response;
        let merchantTableData = [];
        let state = {};
        if (code === 1) {
          if (data) {
            merchantTableData = [data];
          }
          state = { ...this.state, merchantTableData, isClick: true };
        } else {
          state = { ...this.state, isClick: true };
        }
        this.setState({
          ...state,
        });
      },
    });
  };

  private handleDialogClose = () => {
    this.props.close();
    this.props.form.resetFields();
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
      const files: any[] = [...fileList];
      files.push({ uid: data, url: data });
      this.setState({ fileList: files, isUpload: false });
    }
  };

  private handleRemove = (data: any) => {
    const { uid } = data;
    const { fileList } = this.state;
    const files: any[] = [...fileList];
    const index: number = _.findIndex(files, (o: any) => o.uid === uid);
    files.splice(index, 1);
    this.setState({ fileList: files });
  };

  render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      systemTableData,
      merchantTableData,
      uploadApi,
      fileList,
      previewVisible,
      previewImage,
      isUpload,
    } = this.state;
    const { visible, data } = this.props;

    const uploadButton: ReactNode = (
      <div>
        <Icon type="plus" />
        {/* 上传 */}
        <div className="ant-upload-text">{formatMessage({ id: 'recharge-repair.upload-btn' })}</div>
      </div>
    );

    return (
      <Modal
        visible={visible}
        width={1100}
        title={formatMessage({ id: 'recharge-repair-detail-dialog.modal-title' })}
        onCancel={this.handleDialogClose}
        footer={optButtonGroup(this)}
      >
        {/* 系统订单详情 */}
        <h3>{formatMessage({ id: 'recharge-repair-detail-dialog.system-order-detail-title' })}</h3>
        <Table
          className={styles.tableContainer}
          size="small"
          bordered
          pagination={false}
          rowKey={(record: any, index: number) => String(index)}
          columns={getRepairSysColumns(this)}
          dataSource={systemTableData}
        />
        <br />
        {/* 第三方订单详情 */}
        <h3>{formatMessage({ id: 'recharge-repair-detail-dialog.third-order-detail-title' })}</h3>
        <Table
          className={styles.tableContainer}
          size="small"
          bordered
          pagination={false}
          rowKey={(record: any, index: number) => String(index)}
          columns={getRepairMerColumns(this)}
          dataSource={merchantTableData}
        />
        <Form style={{ marginTop: '10px' }}>
          {/* 备注 */}
          <FormItem label={<FormattedMessage id="recharge-repair-detail-dialog.form-remark" />}>
            {getFieldDecorator('sucReqRemark', {
              initialValue: checkShowOpt(data) ? '' : data.sucReqRemark,
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: 'recharge-repair-detail-dialog.form-remark-required',
                  }),
                },
              ],
            })(<TextArea rows={4} disabled={!checkShowOpt(data)} />)}
          </FormItem>
        </Form>

        {checkShowOpt(data) ? (
          <div>
            {/* 上传转账凭证截图： */}
            <h4>{formatMessage({ id: 'recharge-repair-detail-dialog.img-upload-title' })}:</h4>
            <Upload<>
              action={uploadApi}
              listType="picture-card"
              fileList={fileList}
              accept="image/*"
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
            {/* 图片上传中... */}
            {isUpload ? (
              <p>{formatMessage({ id: 'recharge-repair-detail-dialog.img-upload-status' })}...</p>
            ) : null}
            <Modal
              width={1200}
              visible={previewVisible}
              footer={null}
              onCancel={() => {
                this.setState({ previewVisible: false });
              }}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        ) : null}
      </Modal>
    );
  }
}

const RepairDetailDialogContainer = Form.create({ name: 'ReviewDialog' })(RepairDetailDialog);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(RepairDetailDialogContainer),
);
