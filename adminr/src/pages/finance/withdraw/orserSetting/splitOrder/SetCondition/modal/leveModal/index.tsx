import { Modal } from 'antd';
import React from 'react';

const C = (props: any) => {
  const { show, showLoading, hide, rowData, levelListData } = props;
  const levelName: any = [];
  const levelIdArr = rowData.levelId ? rowData.levelId.split(',').map(Number) : [];
  levelIdArr.forEach((item: any, index: number) => {
    levelListData.forEach((obj: any, i: number) => {
      if (item === obj.levelId) {
        levelName.push({ name: obj.name, id: obj.levelId });
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
          {levelName.map((item: any, index: number) => (
            <span key={item.id}>{item.name}， </span>
          ))}
        </p>
      </Modal>
    </>
  );
};

export default C;
