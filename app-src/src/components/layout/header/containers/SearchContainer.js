import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from 'components/generic/form/presentational/Search';
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
            <div
                className="size-lg-12"
                ref={node => {
                    this.node = node;
                }}
            >
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
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            this.setState({
                resultsVisible: false
            });
            document.removeEventListener(
                'click',
                this.handleOutsideClick,
                false
            );
        }
    };

    handleOutsideClick = e => {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }

        this.setState({
            resultsVisible: false
        });
    };
}

export default connect()(SearchContainer);
