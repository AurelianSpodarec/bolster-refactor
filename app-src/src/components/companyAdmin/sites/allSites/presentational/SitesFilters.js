import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const SitesListFilters = ({
    name,
    statusOptions,
    selectedStatus,
    handleChange,
    onMobile,
    sortOptions,
    selectedSort,
    isSorting,
    toggleIsSortingSites,
}) => (
    <form className="table-search size-lg-12">
        {onMobile ? (
            <>
                <Search
                    value={name}
                    name="name"
                    placeholder="Search by site name..."
                    handleChange={handleChange}
                />
                <div className="table-filter">
                    <p>Filter by status:</p>
                    <Select
                        placeholder="All sites"
                        name="status"
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleChange}
                    />
                </div>
                <div className="table-filter">
                    <p>Sort by:</p>
                    <Select
                        name="sortBy"
                        options={sortOptions}
                        value={selectedSort}
                        onChange={handleChange}
                        omitPlaceholder
                    />
                </div>
                <div className="table-filter">
                    <p>Sort Mode: </p>
                    <ButtonWrapper alignment="right">
                        {isSorting ? (
                            <ActionButton
                                onClick={toggleIsSortingSites}
                                icon="far fa-check"
                                text="Finish Sort"
                                ambient="positive"
                                source="secondary"
                                size="medium"
                            />
                        ) : (
                            <ActionButton
                                onClick={toggleIsSortingSites}
                                icon="far fa-sort"
                                text="Sort Mode"
                                source="secondary"
                                ambient="positive"
                                size="medium"
                            />
                        )}
                    </ButtonWrapper>
                </div>
            </>
        ) : (
            <>
                <Search
                    value={name}
                    name="name"
                    placeholder="Search by site name..."
                    handleChange={handleChange}
                    className="sites-search"
                />
                <ButtonWrapper alignment="right">
                    {isSorting ? (
                        <ActionButton
                            onClick={toggleIsSortingSites}
                            icon="far fa-check"
                            text="Finish Sort"
                            ambient="positive"
                            source="secondary"
                            size="medium"
                        />
                    ) : (
                        <ActionButton
                            onClick={toggleIsSortingSites}
                            icon="far fa-sort"
                            text="Sort Mode"
                            source="secondary"
                            ambient="positive"
                            size="medium"
                        />
                    )}
                    <div style={{ marginLeft: '1em' }}>
                        <Select
                            placeholder="All sites"
                            name="status"
                            options={statusOptions}
                            value={selectedStatus}
                            onChange={handleChange}
                        />
                        {/* <p>Filter by status:</p> */}
                    </div>
                    <div style={{ marginLeft: '1em' }}>
                        <Select
                            name="sortBy"
                            options={sortOptions}
                            value={selectedSort}
                            onChange={handleChange}
                            omitPlaceholder
                        />
                        {/* <p>Sort by:</p> */}
                    </div>
                </ButtonWrapper>
            </>
        )}
    </form>
);

export default SitesListFilters;
