import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';
import templeteData from '../../TemplateDetails.json';
import VideoImageOverlay from './customVideoComponents/videoImageOverlay/VideoImageOverlay';
import VideoBackButtonOverlay from './customVideoComponents/VideoBackButtonOverlay/VideoBackButtonOverlay';
import videoTickerOverlay from './customVideoComponents/videoTickerOverlay/videoTickerOverlay';
import VideoForwardBackwardOverlay from './customVideoComponents/videoForwardBackwardOverlay/videoForwardBackwardOverlay';
class VideoPlayer extends Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    /* const xAxis = '50%';
    const YAxis = '6%';
    const startTime = '10';
    const endTime = '20';
    const overlyFlag = true; */

    templeteData.data.forEach((data, key) => {
      const xAxis = data.marker_x_origin;
      const yAxis = data.marker_y_origin;
      const startTime = data.overlay_visible_start_time;
      const endTime = data.overlay_visible_end_time;
      const templateMarkerId = data.template_marker_id;
      if (data.allow_image_flag === 'Y') {
        this.player.getChild('controlBar').addChild('VideoImageOverlay', {
          xAxis,
          yAxis,
          startTime,
          endTime,
          templateMarkerId,
        });
      }
      if (data.allow_richtext_flag === 'Y') {
        this.player.getChild('controlBar').addChild('videoTickerOverlay', {
          xAxis,
          yAxis,
          startTime,
          endTime,
          templateMarkerId,
        });
      }
    });

    this.player
      .getChild('controlBar')
      .addChild('VideoForwardBackwardOverlay', {});
    this.player.getChild('controlBar').addChild('VideoBackButtonOverlay', {});
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  clickHandle = () => {
    if (this.player) {
      alert('Stop');
      this.player.pause();
    }
  };
  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div className='video-section'>
          <div className='video-container'>
            <div className='video-player'>
              <div data-vjs-player>
                <video
                  ref={(node) => (this.videoNode = node)}
                  id='test'
                  className='video-js vjs-theme-forest'
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
