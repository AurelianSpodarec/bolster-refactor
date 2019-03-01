import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from 'components/generic/presentational/Search';
import SearchResults from '../presentational/SearchResults';

class SearchContainer extends Component {
    state = {
        resultsVisible: false
    };

    render() {
        const { resultsVisible } = this.state;
        const { value, name } = this.props;
        const { handleChange } = this;

        return (
            <div className="size-lg-12">
                <Search
                    value={value}
                    name={name}
                    placeholder="Search..."
                    handleChange={handleChange}
                />
                <SearchResults resultsVisible={resultsVisible} />
            </div>
        );
    }

    handleChange = e => {
        if (e.target.value.length > 0) {
            this.setState({
                resultsVisible: true
            });
        } else {
            this.setState({
                resultsVisible: false
            });
        }
    };
}

export default connect()(SearchContainer);
