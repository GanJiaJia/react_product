import { Button, Form, Spin } from 'antd';
import React, { ReactNode } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { AdjustForm, getColumns } from './until';

import ApplicationModal from './modal/Application';
import BaseComponent from '@/components/BaseComponent';
import FirstCheckModal from './modal/FirstCheck';
import Mtable from '@/components/Mtable';
import SecondCheckModal from './modal/SecondCheck';
import styles from './style.less';
import types from '@/const/constType';
import { checkPermission } from '@/utils/resolvePermission';

const { ADJUST_TYPE, CODE } = types;
const transferData = (arr: any) =>
  arr.map(ele => ({
    text: ele,
    value: ele,
  }));

class Adjustment extends BaseComponent {
  public columns = [];

  constructor(props: any) {
    super(props);
    this.resetForm = this.resetForm.bind(this);
    this.okSaveApplication = this.okSaveApplication.bind(this);
    this.okSaveFirstCheck = this.okSaveFirstCheck.bind(this);
    this.okSaveSecondCheck = this.okSaveSecondCheck.bind(this);
    this.handleCascaderChange = this.handleCascaderChange.bind(this);
    this.setFiltersParams = this.setFiltersParams.bind(this);
    this.selectTimeChange = this.selectTimeChange.bind(this);
    this.downloaExcel = this.downloaExcel.bind(this);
    this.getFilterDataList();
  }

  public state = {
    isFisrtUncheck: false,
    effectParams: {
      userType: '-1',
      keywords: undefined,
      changeType: '1009',
      subType: '2,1',
    },
    showApplicationModal: false,
    showFirstCheckModal: false,
    isSecondUncheck: false,
    showSecondCheckModal: false,
    rowData: {},
    failInfo: {
      invalid: [],
      failList: [],
      successList: [],
    },
  };

  componentWillMount() {
    this.columns = getColumns(this);
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      subType: this.state.effectParams.subType,
    });
  }

  public selectTimeChange = (values: any, dates: any): void => {
    this.setState(prevState => ({
      effectParams: {
        ...prevState.effectParams,
        startDate: dates[0],
        endDate: dates[1],
      },
    }));
  };

  // 重置查询条件
  public resetForm() {
    this.props.form.resetFields();
    this.setState(
      {
        effectParams: {
          userType: '-1',
          changeType: '1009',
          subType: '2,1',
        },
      },
      () => {
        this.refMtable.bindEffects();
      },
    );
  }

  public setFiltersParams(filtes: any, sorter: any, cb: any) {
    const creator = filtes.creator ? filtes.creator[0] : undefined;
    const firstApprover = filtes.firstApprover ? filtes.firstApprover[0] : undefined;
    const secondApprover = filtes.secondApprover ? filtes.secondApprover[0] : undefined;
    this.setState(
      (preState: any) => ({
        effectParams: { ...preState.effectParams, creator, firstApprover, secondApprover },
      }),
      () => {
        if (cb) {
          cb();
        }
      },
    );
  }

  public okSaveApplication(values: any, cb: any) {
    this.props.dispatch({
      type: 'adjust/adjustAdjustmentEffect',
      payload: values,
      fn: (res: any) => {
        if (res.code === CODE) {
          this.refMtable.bindEffects();
          if (cb) {
            cb();
          }
        }
        if (res.data.invalid.length <= 0 && res.data.failList.length <= 0) {
          this.setState(
            {
              showApplicationModal: false,
              failInfo: {
                failList: [],
                invalid: [],
                successList: [],
              },
            },
            () => {
              if (cb) {
                cb();
              }
            },
          );
        } else {
          this.setState(
            {
              failInfo: {
                failList: res.data.failList,
                invalid: res.data.invalid,
                successList: res.data.successList,
              },
            },
            () => {
              if (cb) {
                cb();
              }
            },
          );
        }
      },
    });
  }

  // 调整类型 选择器改变
  public handleCascaderChange = (value: any) => {
    let result: any = null;
    if (value.length <= 1) {
      for (let i = 0; i < ADJUST_TYPE.length; i += 1) {
        if (ADJUST_TYPE[i][value]) {
          result = ADJUST_TYPE[i][value];
          break;
        }
      }
    } else {
      const [value1, value2] = value;
      result = value2;
    }
    this.props.form.setFieldsValue({
      changeType: value[0],
      subType: result,
    });
  };

  public okSaveFirstCheck(values: any, cb: any) {
    this.props.dispatch({
      type: 'adjust/adjustmentFirstCheckEffect',
      payload: values,
      fn: (res: any) => {
        if (cb) {
          cb();
        }
        if (res.code === CODE) {
          this.refMtable.bindEffects();
        }
        this.setState({ showFirstCheckModal: false });
      },
    });
  }

  public okSaveSecondCheck(values: any, cb: any) {
    this.props.dispatch({
      type: 'adjust/adjustmentSecondCheckEffect',
      payload: values,
      fn: (res: any) => {
        if (cb) {
          cb();
        }
        if (res.code === CODE) {
          this.refMtable.bindEffects();
        }
        this.setState({ showSecondCheckModal: false });
      },
    });
  }

  public getFilterDataList() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adjust/adjustmentCreatorEffect',
      payload: {},
    });
    dispatch({
      type: 'adjust/adjustmentFirstListEffect',
      payload: {},
    });
    dispatch({
      type: 'adjust/adjustmentSecondListEffect',
      payload: {},
    });
  }

  public downloaExcel() {
    this.props.dispatch({
      type: 'adjust/excelExportEffect',
      payload: this.state.effectParams,
      fn: data => {
        // console.log(data);
      },
    });
  }

  public render(): ReactNode {
    const { getFieldDecorator } = this.props.form;
    const {
      showApplicationModal,
      showFirstCheckModal,
      isFisrtUncheck,
      rowData,
      showSecondCheckModal,
      isSecondUncheck,
      failInfo,
    } = this.state;
    const { adjustmentData, creatorList, firstCheckerList, secondCheckerList } = this.props.adjust;
    const {
      loading,
      loadingAdjust,
      loadingFirstCheck,
      loadingSecondCheck,
      loadingDownload,
    } = this.props;
    this.columns[7].filters = transferData(creatorList);
    this.columns[11].filters = transferData(firstCheckerList);
    this.columns[14].filters = transferData(secondCheckerList);
    return (
      <div className={styles.rechargeWrap}>
        <Spin spinning={loading}>
          <AdjustForm
            resetForm={this.resetForm}
            getFieldDecorator={getFieldDecorator}
            handleCascaderChange={this.handleCascaderChange}
            selectTimeChange={this.selectTimeChange}
            handleSubmit={(e: React.SyntheticEvent) => {
              if (this.refMtable) {
                this.refMtable.handleSubmit(e, this);
              }
            }}
          />

          <div className={styles.exportBtnWrap}>
            {checkPermission(this.props.btns, 'new-finance-adjust-record-apple') ? (
              <Button
                type="primary"
                onClick={() => {
                  this.setState({ showApplicationModal: true });
                }}
              >
                调整申请
              </Button>
            ) : null}

            {checkPermission(this.props.btns, 'new-finance-adjust-record-export') ? (
              <Button loading={loadingDownload} onClick={this.downloaExcel}>
                导出
              </Button>
            ) : null}
          </div>

          <Mtable
            tableSize="small"
            bordered
            columns={this.columns}
            effectType="adjust/adjustmentEffect"
            effectParams={this.state.effectParams}
            dataSource={adjustmentData}
            dispatch={this.props.dispatch}
            setFiltersParams={this.setFiltersParams}
            scroll={{ x: 2500 }}
            ref={(element: ReactNode) => {
              this.refMtable = element;
            }}
          />

          <ApplicationModal<>
            show={showApplicationModal}
            showLoading={loadingAdjust}
            hide={() => {
              this.setState({ showApplicationModal: false });
            }}
            handleOk={this.okSaveApplication}
            failInfo={failInfo}
          />

          <FirstCheckModal
            rowData={rowData}
            show={showFirstCheckModal}
            showLoading={loadingFirstCheck}
            hide={() => {
              this.setState({ showFirstCheckModal: false });
            }}
            handleOk={this.okSaveFirstCheck}
            isFisrtUncheck={isFisrtUncheck}
          />

          <SecondCheckModal
            rowData={rowData}
            show={showSecondCheckModal}
            showLoading={loadingSecondCheck}
            hide={() => {
              this.setState({ showSecondCheckModal: false });
            }}
            handleOk={this.okSaveSecondCheck}
            isSecondUncheck={isSecondUncheck}
          />
        </Spin>
      </div>
    );
  }
}

const WrappedHistory = Form.create({ name: 'searchAdjustment' })(Adjustment);

export default withRouter(
  connect(({ adjust, loading, global }: { adjust: any; loading: any; global }) => ({
    adjust,
    loading: loading.effects['adjust/adjustmentEffect'],
    loadingAdjust: loading.effects['adjust/adjustAdjustmentEffect'],
    loadingFirstCheck: loading.effects['adjust/adjustmentFirstCheckEffect'],
    loadingSecondCheck: loading.effects['adjust/adjustmentSecondCheckEffect'],
    loadingDownload: loading.effects['adjust/excelExportEffect'],
    btns: global.btns,
  }))(WrappedHistory),
);
