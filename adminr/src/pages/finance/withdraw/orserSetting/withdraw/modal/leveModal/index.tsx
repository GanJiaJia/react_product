import { Modal } from 'antd';
import React from 'react';

const C = (props: any) => {
  const { show, showLoading, hide, rowData, levelListData } = props;
  const levelIdMap = rowData.levelId ? rowData.levelId.split(',').map(Number) : [];
  const levelIdMapFormat: any = [];
  levelIdMap.forEach((item: any, index: number) => {
    levelListData.forEach((obj: any, i: number) => {
      if (item === obj.levelId) {
        levelIdMapFormat.push(obj.name);
      }
    });
  });
  return (
    <>
      <Modal
        title="查看层级设置"
        okText="确定"
        visible={show}
        onCancel={() => {
          hide();
        }}
        onOk={() => hide()}
        confirmLoading={showLoading}
      >
        <p>层级设置：</p>
        <p>
          {levelIdMapFormat.map((item: any, index: number) => (
            // eslint-disable-next-line
            <span key={index}>{item},</span>
          ))}
        </p>
      </Modal>
    </>
  );
};

export default C;
