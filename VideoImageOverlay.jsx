import React from 'react';
import VideoImageOverlayChild from './VideoImageOverlayChild';
import ReactDOM from 'react-dom';
import videojs from 'video.js';
const vjsComponent = videojs.getComponent('Component');

class VideoImageOverlay extends vjsComponent {
  constructor(player, options) {
    super(player, options);
    this.state = {
      seconds: null,
    };
    /* Bind the current class context to the mount method */
    this.mount = this.mount.bind(this);

    /* When player is ready, call method to mount React component */
    player.ready(() => {
      this.mount();
    });
    /* Remove React root when component is destroyed */
    this.on('dispose', () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  /**
   * We will render out the React EpisodeList component into the DOM element
   * generated automatically by the VideoJS createEl() method.
   *
   * We fetch that generated element using `this.el()`, a method provided by the
   * vjsComponent class that this class is extending.
   */
  mount() {
    console.log(this.player_);
    console.log(this.options_);
    this.player_.on('timeupdate', () => {
      let getcurrentTime = this.player_.currentTime();
      let minutes = Math.floor(getcurrentTime / 60);
      let seconds = Math.floor(getcurrentTime - minutes * 60);
      if (seconds == '2') {
        ReactDOM.render(
          <VideoImageOverlayChild
            vjsComponent={this}
            videoTicker={this.options_.videoTicker}
            imgOption={this.options_.logo}
            playerObject={this.player_}
            xAxis={this.options_.xAxis}
            yAxis={this.options_.yAxis}
          />,
          this.el()
        );
      }
      if (seconds == '5') {
        ReactDOM.unmountComponentAtNode(this.el());
      }
    });
  }
}

/**
 * Make sure to register the vjsComponent so Video JS knows it exists
 */
vjsComponent.registerComponent('VideoImageOverlay', VideoImageOverlay);
export default VideoImageOverlay;
