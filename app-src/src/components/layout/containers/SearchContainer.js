import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from 'components/generic/presentational/Search';

class SearchContainer extends Component {
    render() {
        const { value, name, handleChange } = this.props;

        return (
            <Search
                value={value}
                name={name}
                placeholder="Search..."
                handleChange={handleChange}
            />
        );
    }
}

export default connect()(SearchContainer);
