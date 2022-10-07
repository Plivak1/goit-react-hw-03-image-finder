import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  componentDidUpdate(prevP, prevS) {
    if (prevP !== this.props) {
      window.scrollBy({
        top: 360 * 2,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { images } = this.props;

    return (
      <Gallery>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImgLink={webformatURL}
              largeImgLink={largeImageURL}
              tags={tags}
            />
          );
        })}
      </Gallery>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImgLink: PropTypes.string.isRequired,
  largeImgLink: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
