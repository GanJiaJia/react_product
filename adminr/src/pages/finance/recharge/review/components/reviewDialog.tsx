import { Form, Input, Modal, Radio, Table, message } from 'antd';

import React, { Fragment } from 'react';
import { connect } from 'dva';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router-dom';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { getReviewMerColumns, getReviewSysColumns } from '../utils';
import { getOrderDetail, createOrderSave } from '../../service';
import styles from '../style.less';
import ImgViewDialog from '../../components/imgViewDialog/index';
import { SUCCESS_CODE } from '../../data';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { TextArea } = Input;

interface StateType {
  [propName: string]: any;
}

// 渲染表单
function renderForm(self: any) {
  const formLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };
  const { getFieldDecorator } = self.props.form;

  return (
    <Form {...formLayout} onSubmit={self.handleSubmit} style={{ marginTop: '10px' }}>
      {/* 审核结果 */}
      <FormItem
        label={<FormattedMessage id="recharge-review-dialog.form.review-result" />}
        {...formItemLayout}
      >
        {getFieldDecorator('status', {
          initialValue: 1,
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'recharge-review-dialog.form.review-result-required' }),
            },
          ],
        })(
          <RadioGroup>
            {/* 通过 */}
            <RadioButton value={1}>
              {formatMessage({ id: 'recharge-review-dialog.form.radio-pass' })}
            </RadioButton>
            {/* 不通过 */}
            <RadioButton value={2}>
              {formatMessage({ id: 'recharge-review-dialog.form.radio-not-pass' })}
            </RadioButton>
          </RadioGroup>,
        )}
      </FormItem>

      {/* 备注 */}
      <FormItem
        label={<FormattedMessage id="recharge-review-dialog.form.remark" />}
        {...formItemLayout}
      >
        {getFieldDecorator('remark', {
          initialValue: '',
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'recharge-review-dialog.form.remark-required' }),
            },
          ],
        })(<TextArea rows={4} />)}
      </FormItem>
    </Form>
  );
}

// 渲染凭证截图
function renderImgList(self: any) {
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

class ReviewDialog extends React.Component<StateType> {
  public systemColumns = getReviewSysColumns(this);

  public merchantColumns = getReviewMerColumns(this);

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
    systemTableData: [
      {
        sucReqRemark: '',
      },
    ],
    merchantTableData: [{ status: undefined }],
    saveData: {},
    orderInfo: {
      attachments: [],
    },
    imgViewDialogVisible: false,
    activeIndex: undefined,
    // isClick: false,
  };

  componentDidMount() {
    const { data } = this.props;
    const { orderId, dataType } = data;
    this.hanleTableData(data);
    this.getOrderDetailEffect({ orderId });
    if (dataType !== 0) this.handleCheck(data);
  }

  // 处理表格数据
  private hanleTableData = (data: any) => {
    const { orderId, amount } = data;
    const systemTableData = [{ ...data }];
    const saveData = { orderId, amount };
    const obj = { ...this.state, systemTableData, saveData, inputVal: amount };
    this.setState({ ...obj });
  };

  // 验证三方状态
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
          state = { ...this.state, merchantTableData };
        } else {
          state = { ...this.state };
        }
        this.setState({
          ...state,
        });
      },
    });
  };

  // 获取订单详情
  private getOrderDetailEffect = (params: object) => {
    getOrderDetail(params).then((response: { code: number; data: { remark: any } }) => {
      const { code, data } = response;
      if (code === 1 && data) {
        const { systemTableData } = this.state;
        systemTableData['0'].sucReqRemark = data.remark;
        this.setState({ orderInfo: data, systemTableData });
      }
    });
  };

  // 补单申请保存
  private bindEffects = (values: object) => {
    this.props.dispatch({
      type: 'recharge/reviewSaveEffect',
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

  // 创建订单保存
  private createOrderSaveEffect = (params: any) => {
    const data = { ...params, ...this.state.saveData };
    createOrderSave(data).then((res: any) => {
      if (res && res.code === SUCCESS_CODE) {
        message.success('保存成功');
      } else {
        message.error(res.message);
      }
      this.props.form.resetFields();
      this.props.confirm();
    });
  };

  private handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        const { dataType } = this.props.data;
        if (dataType === 0) {
          this.createOrderSaveEffect(values);
        } else {
          this.bindEffects(values);
        }
      }
    });
  };

  private handleImg = (index: number) => {
    this.setState({
      activeIndex: index,
      imgViewDialogVisible: true,
    });
  };

  render() {
    const {
      systemTableData,
      merchantTableData,
      activeIndex,
      orderInfo,
      imgViewDialogVisible,
    } = this.state;
    const { visible, data } = this.props;
    const remark = this.props.form.getFieldValue('remark');
    const okBtnAvailable = remark && remark.length > 0;
    const title =
      data.dataType === 0
        ? formatMessage({ id: 'recharge-review-dialog.modal.create-title' })
        : formatMessage({ id: 'recharge-review-dialog.modal.title' });

    return (
      // title: 补单审核
      // okText: 确定
      <Modal
        visible={visible}
        width={1000}
        title={title}
        okText={formatMessage({ id: 'recharge-review-dialog.modal.okText' })}
        onOk={this.handleSubmit}
        onCancel={() => {
          this.props.form.resetFields();
          this.props.close();
        }}
        okButtonProps={{ disabled: !okBtnAvailable }}
      >
        {/* 系统订单详情 */}
        <h3>{formatMessage({ id: 'recharge-review-dialog.system-order-detail-title' })}</h3>
        <Table
          className={styles.tableContainer}
          size="small"
          bordered
          pagination={false}
          rowKey={(record: any, index: number) => String(index)}
          columns={this.systemColumns}
          dataSource={systemTableData}
        />
        <br />
        {data.dataType !== 0 ? (
          <Fragment>
            {/* 第三方订单详情 */}
            <h3>{formatMessage({ id: 'recharge-review-dialog.third-order-detail-title' })}</h3>
            <Table
              className={styles.tableContainer}
              size="small"
              bordered
              pagination={false}
              rowKey={(record: any, index: number) => String(index)}
              columns={this.merchantColumns}
              dataSource={merchantTableData}
            />
          </Fragment>
        ) : null}
        {/* 转账凭证截图 */}
        {orderInfo.attachments && orderInfo.attachments.length > 0 ? (
          <h3 style={{ marginTop: '10px' }}>
            {formatMessage({ id: 'recharge-review-dialog.img-upload-title' })}
          </h3>
        ) : null}
        {renderImgList(this)}
        {renderForm(this)}
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

const ReviewDialogContainer = Form.create({ name: 'ReviewDialog' })(ReviewDialog);

export default withRouter(
  connect(({ recharge }: { recharge: any }) => ({
    recharge,
  }))(ReviewDialogContainer),
);
