import React from 'react';
import { connect } from 'react-redux';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';

const viewModeOptions = [
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' },
];

const DocumentFilters = ({ searchTerm, onMobile, viewMode, setViewMode }) => (
    <form className="table-search size-lg-12">
        <div className="flex-container document-filters">
            <Search
                value={searchTerm}
                name="searchTerm"
                placeholder="Search by filename..."
                handleChange={() => {}}
            />
            <Select
                name="viewMode"
                value={viewMode}
                options={viewModeOptions}
                onChange={(_, value) => setViewMode(value)}
                placeholder="-- View mode --"
            />
            <Select
                name="filter"
                value={null}
                options={[]}
                onChange={() => {}}
                placeholder="Filter"
            />
        </div>
    </form>
);

export default connect(({ shared: { mobileReducer: { onMobile } } }) => ({
    onMobile,
}))(DocumentFilters);
