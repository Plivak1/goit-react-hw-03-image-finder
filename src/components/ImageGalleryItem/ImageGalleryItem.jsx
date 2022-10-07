import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
    largeImg: '',
  };

  openModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const largeImgLink = e.target.dataset.largeimglink;
    this.setState({
      largeImg: largeImgLink,
      isOpenModal: true,
    });
  };

  closeModal = e => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { largeImg, isOpenModal } = this.state;
    const { smallImgLink, tags, largeImgLink } = this.props;

    return (
      <GalleryItem>
        <GalleryImage
          src={smallImgLink}
          alt={tags}
          data-largeimglink={largeImgLink}
          onClick={this.openModal}
        />
        {isOpenModal && (
          <Modal closeModal={this.closeModal} largeImg={largeImg} />
        )}
      </GalleryItem>
    );
  }
}

GalleryImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  'data-largeimglink': PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};
