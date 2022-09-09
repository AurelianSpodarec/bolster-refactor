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
    handleLinkClick,
    isLoading,
    omitIcon,
    placeholder = 'Search...',
}) => (
    <div className="size-lg-12" ref={ref}>
        <Search
            placeholder={placeholder}
            handleChange={handleChange}
            value={searchTerm}
            name="searchTerm"
            omitIcon={omitIcon}
            className="header-nav"
        />
        {resultsVisible && (
            <div className="dropdown-search-results visible">
                <SearchResults
                    results={results}
                    isFetching={isFetching}
                    error={error}
                    handleLinkClick={handleLinkClick}
                    isLoading={isLoading}
                />
            </div>
        )}
    </div>
);

export default SearchBar;
