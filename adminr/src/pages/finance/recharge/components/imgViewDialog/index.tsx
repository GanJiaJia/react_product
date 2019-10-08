import React from 'react';
import { Icon } from 'antd';
import styles from './style.less';

interface PropType {
  [propName: string]: any;
}

class ImgViewDialog extends React.Component<PropType> {
  public state = {
    index: 0,
    data: [],
  };

  componentDidMount() {
    const { index, data } = this.props;
    this.setState({ index, data });
  }

  private handleChange(type: number) {
    // type: 1 左侧箭头 2 右侧箭头
    const { index, data } = this.state;
    const { length } = data;
    let newIndex = index;
    if (type === 1) {
      if (index === 0) {
        newIndex = length - 1;
      } else {
        newIndex -= 1;
      }
    }

    if (type === 2) {
      if (index === length - 1) {
        newIndex = 0;
      } else {
        newIndex += 1;
      }
    }
    this.setState({
      index: newIndex,
    });
  }

  render() {
    const { index, data } = this.state;

    return (
      <div className={styles.shadow} onClick={this.props.close}>
        <div className={styles.imgBox}>
          <Icon
            type="left"
            className={styles.imgBtn}
            onClick={e => {
              e.stopPropagation();
              this.handleChange(1);
            }}
          />
          <div
            className={styles.imgContainer}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Icon type="close" className={styles.closeBtn} onClick={this.props.close} />
            {data.length > 0 ? <img src={data[index]} alt="" /> : null}
          </div>
          <Icon
            type="right"
            className={styles.imgBtn}
            onClick={e => {
              e.stopPropagation();
              this.handleChange(2);
            }}
          />
        </div>
      </div>
    );
  }
}

export default ImgViewDialog;
