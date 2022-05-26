import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ButtonDropdown from 'components/shared/filters/ButtonDropdown';

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
                    <ButtonWrapper alignment="right">
                        <ButtonDropdown
                            buttonText="All Sites"
                            name="status"
                            options={statusOptions}
                            value={selectedStatus}
                            handleChange={handleChange}
                            isNumberValues
                            scrollElementID="modal-block"
                        />
                    </ButtonWrapper>
                </div>
                <div className="table-filter">
                    <p>Sort by:</p>
                    <ButtonWrapper alignment="right">
                        <ButtonDropdown
                            buttonText="Sort by"
                            name="sortBy"
                            options={sortOptions}
                            value={selectedSort}
                            handleChange={handleChange}
                            isNumberValues
                            scrollElementID="modal-block"
                        />
                    </ButtonWrapper>
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
                            />
                        ) : (
                            <ActionButton
                                onClick={toggleIsSortingSites}
                                icon="far fa-sort"
                                text="Sort Mode"
                                source="secondary"
                                ambient="positive"
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
                        <ButtonDropdown
                            buttonText="All Sites"
                            name="status"
                            options={statusOptions}
                            value={selectedStatus}
                            handleChange={handleChange}
                            isNumberValues
                            scrollElementID="modal-block"
                            size="medium"
                        />
                    </div>
                    <div style={{ marginLeft: '1em' }}>
                        <ButtonDropdown
                            buttonText="Sort by"
                            name="sortBy"
                            options={sortOptions}
                            value={selectedSort}
                            handleChange={handleChange}
                            isNumberValues
                            scrollElementID="modal-block"
                            size="medium"
                        />
                    </div>
                </ButtonWrapper>
            </>
        )}
    </form>
);

export default SitesListFilters;
