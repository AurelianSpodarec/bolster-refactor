import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';

const viewModeOptions = [
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' },
];

const DocumentFilters = ({ searchTerm, onMobile, viewMode, setViewMode }) => {
    const dispatch = useDispatch();
    return (
        <form className="table-search size-lg-12 flex-container document-filters">
            <Search
                value={searchTerm}
                name="searchTerm"
                placeholder="Search by file/folder name..."
                handleChange={() => {}}
            />
            <Select
                name="viewMode"
                value={viewMode}
                options={viewModeOptions}
                onChange={(_, value) => {
                    dispatch(setViewMode(value));
                }}
                placeholder="-- View mode --"
            />
            <Select
                name="filter"
                value={null}
                options={[]}
                onChange={() => {}}
                placeholder="Filter"
            />
        </form>
    );
};

export default connect(({ shared: { mobileReducer: { onMobile } } }) => ({
    onMobile,
}))(DocumentFilters);
