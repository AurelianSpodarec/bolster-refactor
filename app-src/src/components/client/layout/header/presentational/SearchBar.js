import React from 'react';
import Search from 'components/shared/generic/form/presentational/Search';
import SearchResults from './SearchResults';

const SearchBar = ({
    searchTerm,
    isFetching,
    error,
    resultsVisible,
    handleChange,
    results,
    ref,
    handleLinkClick
}) => (
    <div className="size-lg-12" ref={ref}>
        <Search
            placeholder="Search..."
            handleChange={handleChange}
            value={searchTerm}
            name="searchTerm"
        />
        {resultsVisible && (
            <div className="dropdown-search-results visible">
                <SearchResults
                    results={results}
                    isFetching={isFetching}
                    error={error}
                    handleLinkClick={handleLinkClick}
                />
            </div>
        )}
    </div>
);

export default SearchBar;
