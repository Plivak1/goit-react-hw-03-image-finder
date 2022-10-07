import { Overlay, ImageModal, LargeImage } from './Modal.styled';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClickEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClickEsc);
  }

  onClickEsc = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.closeModal();
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImg } = this.props;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ImageModal>
          <LargeImage src={largeImg} />
        </ImageModal>
      </Overlay>,
      document.querySelector('#image-modal')
    );
  }
}

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

LargeImage.propTypes = {
  src: PropTypes.string.isRequired,
};
