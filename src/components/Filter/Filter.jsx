import PropTypes from 'prop-types';
import { Component } from 'react';
import { Input } from '../Styles/Styles';

export class Filter extends Component {
  render() {
    const { filterByName, value } = this.props;
    return (
      <>
        <p>Find contacts by name</p>
        <Input
          type="text"
          name="filter"
          value={value}
          onChange={filterByName}
        ></Input>
      </>
    );
  }
}

Filter.propTypes = {
  filterByName: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;
