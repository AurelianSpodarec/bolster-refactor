import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from 'components/generic/form/presentational/Search';
import SearchResults from '../presentational/SearchResults';

import fetchSearchResults from 'actions/search/async/fetchSearchResults';

class SearchContainer extends Component {
    state = {
        resultsVisible: false
    };

    render() {
        const { state, props, handleChange, handleLinkClick } = this;

        return (
            <div
                className="size-lg-12"
                ref={node => {
                    this.node = node;
                }}
            >
                <Search placeholder="Search..." handleChange={handleChange} />
                <div
                    className={`dropdown-search-results ${
                        state.resultsVisible ? 'visible' : ''
                    }`}
                >
                    <SearchResults
                        results={props.results}
                        isFetching={props.isFetching}
                        error={props.error}
                        handleLinkClick={handleLinkClick}
                    />
                </div>
            </div>
        );
    }

    handleChange = e => {
        const { fetchSearchResults } = this.props;

        if (e.target.value.length > 0) {
            this.setState({
                resultsVisible: true
            });
            document.addEventListener('click', this.handleOutsideClick, false);
            fetchSearchResults();
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

    handleLinkClick = () => {
        this.setState({
            resultsVisible: false
        });
    };
}

const mapStateToProps = ({ searchReducers }) => ({
    results: searchReducers.results.results,
    isFetching: searchReducers.results.isFetching,
    error: searchReducers.results.error
});

const mapDispatchToProps = dispatch => ({
    fetchSearchResults: () => {
        dispatch(fetchSearchResults());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchContainer);
