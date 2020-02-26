import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSearchResults from 'actions/companyAdmin/search/async/fetchSearchResults';
import clearSearchResults from 'actions/companyAdmin/search/sync/clearSearchResults';
import SearchBar from '../presentational/SearchBar';

class SearchContainer extends Component {
    state = {
        resultsVisible: false,
        searchTerm: '',
        isLoading: false,
    };

    render() {
        const { searchTerm, resultsVisible, isLoading } = this.state;
        const { isFetching, error } = this.props;
        return (
            <div
                ref={node => {
                    this.node = node;
                }}
            >
                <SearchBar
                    searchTerm={searchTerm}
                    resultsVisible={resultsVisible}
                    isFetching={isFetching}
                    error={error}
                    handleChange={this.handleChange}
                    results={this.formatSearchResults()}
                    handleLinkClick={() => this._closeResults()}
                    isLoading={isLoading}
                />
            </div>
        );
    }

    componentDidUpdate = (prevProps) => {
        const { isFetching } = this.props;

        if (prevProps.isFetching && !isFetching) {
            this.setState({
                isLoading: false,
            });
        }
    }

    formatSearchResults() {
        const { searchTerm } = this.state;
        const { results } = this.props;
        const resultMap = results.map(result => {
            // get type and ID
            const typeData = result.siteID
                ? { type: 'sites', hierarchyID: result.siteID }
                : result.buildingID
                    ? { type: 'buildings', hierarchyID: result.buildingID }
                    : result.floorID
                        ? { type: 'floors', hierarchyID: result.floorID }
                        : { type: 'drawings', hierarchyID: result.drawingID };
            // split search terms to highlight multiple words split by / or space
            const multiSearchTerms = searchTerm
                .split(/\/|\s/gi)
                .map(term => term.toLowerCase());
            const splitRegex = new RegExp(
                `(${multiSearchTerms.join('|')})`,
                'ig'
            );
            // highlight searchterm
            const searchText = result.searchText.split(splitRegex);
            const searchTextComponent = (
                <span>
                    {searchText.map((text, i) =>
                        multiSearchTerms.includes(text.toLowerCase()) ? (
                            // TODO: ## needs styling ##
                            <span key={i} style={{ backgroundColor: 'yellow' }}>
                                {text}
                            </span>
                        ) : (
                                text
                            )
                    )}
                </span>
            );
            return { ...result, ...typeData, searchText: searchTextComponent };
        });
        return resultMap;
    }

    handleChange = (name, value) => {
        const { fetchSearchResults, clearSearchResults } = this.props;
        const resultsVisible = !!value.length;
        this.setState({ resultsVisible, [name]: value });

        if (this.fetchTimeout) clearTimeout(this.fetchTimeout);

        this.setState({
            isLoading: true,
        });

        if (resultsVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
            this.fetchTimeout = setTimeout(() => {
                fetchSearchResults(value);
            }, 750);
        } else {
            document.removeEventListener(
                'click',
                this.handleOutsideClick,
                false
            );
            clearSearchResults();
        }
    };

    handleOutsideClick = e => {
        // ignore clicks on the component itself
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        this._closeResults();
    };

    _closeResults = () => {
        const { resultsVisible } = this.state;
        if (!resultsVisible) return;
        document.removeEventListener('click', this.handleOutsideClick, false);
        // this.setState({ resultsVisible: false });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        searchReducer: { results, isFetching, error }
    }
}) => ({
    results: Object.values(results),
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    fetchSearchResults: searchTerm => {
        dispatch(fetchSearchResults(searchTerm));
    },
    clearSearchResults: () => {
        dispatch(clearSearchResults());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchContainer);
