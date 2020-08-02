import React, { Component } from 'react';
import classes from './VideoImageOverlay.module.css';
import img from '../../../../assets/images/Protinex-Original.jpg';

class VideoImageOverlayChild extends Component {
  clickHandler = () => {
    window.open(
      'https://www.amazon.in/Protinex-Original-400-g/dp/B019391JCQ',
      '_blank'
    );
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <img
          src={img}
          onClick={this.clickHandler}
          alt=''
          style={{
            position: 'fixed',
            top: '6%',
            left: '3%',
            cursor: 'pointer',
            width: '6%',
          }}
        />
      </div>
    );
  }
}

export default VideoImageOverlayChild;
