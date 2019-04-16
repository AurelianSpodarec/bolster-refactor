import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchSearchResults from 'actions/companyAdmin/search/async/fetchSearchResults';
import SearchBar from '../presentational/SearchBar';

class SearchContainer extends Component {
    state = {
        resultsVisible: false,
        searchTerm: ''
    };

    render() {
        const { searchTerm, resultsVisible } = this.state;
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
                />
            </div>
        );
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

            // highlight searchterm
            const splitRegex = new RegExp(`(${searchTerm})`, 'ig');
            const searchText = result.searchText.split(splitRegex);
            const searchTextComponent = (
                <span>
                    {searchText.map((text, i) =>
                        text.toLowerCase() === searchTerm.toLowerCase() ? (
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

    handleChange = ({ target: { value, name } }) => {
        const { fetchSearchResults } = this.props;
        const resultsVisible = !!value.length;
        this.setState({ resultsVisible, [name]: value });
        if (resultsVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
            fetchSearchResults(value);
        } else {
            document.removeEventListener(
                'click',
                this.handleOutsideClick,
                false
            );
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchContainer);
