import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchClientSearchResults from 'actions/client/search/async/clientFetchSearchResults';
import SearchBar from '../presentational/SearchBar';
import { getSelectedCompanyForClient } from 'helpers/generic';

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
            const typeData = {
                type: 'drawings',
                hierarchyID: result.drawingID
            };
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
        const { fetchClientSearchResults } = this.props;
        const resultsVisible = !!value.length;
        const selectedCompanyID = getSelectedCompanyForClient();

        this.setState({ resultsVisible, [name]: value });
        if (resultsVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
            fetchClientSearchResults(selectedCompanyID, value);
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
    client: {
        searchReducer: { results, isFetching, error }
    }
}) => ({
    results: Object.values(results),
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    fetchClientSearchResults: (companyID, searchTerm) => {
        dispatch(fetchClientSearchResults(companyID, searchTerm));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchContainer);
