import { HiOutlineSearch } from 'react-icons/hi';
import PropTypes from 'prop-types';
import {
  SearchBarWrapper,
  Form,
  Input,
  Button,
  ButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({ handleSubmit, isLoading }) => {
  return (
    <SearchBarWrapper>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" disabled={isLoading}>
          <HiOutlineSearch size={25} />
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          name="text"
          autocomplete="off"
          autoFocus={true}
          placeholder="Search images and photos"
        />
      </Form>
    </SearchBarWrapper>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
