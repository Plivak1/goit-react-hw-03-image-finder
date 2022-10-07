import { Component } from 'react';
import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bars } from 'react-loader-spinner';

import { toastInfo } from 'utils/toastInfo';
import { toastError } from 'utils/toastError';

import { fetchImages } from 'services';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button, ButtonWrap } from 'App.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    lastPage: false,
    images: [],
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      setTimeout(async () => {
        try {
          const response = await fetchImages(query, page);
          const newImages = response.hits;

          // Вывести сообщение если нет ошибки, но нет картинок по запросу
          if (newImages.length === 0) {
            this.setState({
              images: [],
              isLoading: false,
            });
            return toastInfo(`Нету картинок по запросу ${query}`);
          }

          this.setState(prevState => {
            return {
              images: [...prevState.images, ...newImages],
            };
          });

          //Вывести сообщение и убрать кнопку, если последняя страница
          if (Math.ceil(response.total / 8) === page) {
            this.setState({ lastPage: true });
            return toastInfo(`Картинок больше нет`);
          }
        } catch (error) {
          return toastError();
        } finally {
          this.setState({ isLoading: false });
        }
      }, 1000);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      elements: { text },
    } = e.currentTarget;

    if (text.value.trim() === '') {
      return toastInfo('Строка пустая. Введите что-нибудь');
    }
    if (text.value.trim() === this.state.query) {
      return toastInfo('Такой же запрос :)');
    }
    this.setState({
      query: text.value.trim(),
      page: 1,
      images: [],
      lastPage: false,
    });
  };

  handleButtonClick = e => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { isLoading, images, lastPage } = this.state;

    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit} isLoading={isLoading} />
        {images.length !== 0 ? <ImageGallery images={images} /> : <></>}

        <ButtonWrap>
          {isLoading ? (
            // <Loader>Loading...</Loader>

            <Bars
              height="80"
              width="80"
              radius="9"
              color="#3f51b5"
              ariaLabel="Bars"
            />
          ) : (
            <Button
              lastPage={lastPage}
              images={images.length === 0}
              onClick={this.handleButtonClick}
            >
              Load more
            </Button>
          )}
        </ButtonWrap>
        <ToastContainer />
      </>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

Button.propTypes = {
  lastPage: PropTypes.bool.isRequired,
  images: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
