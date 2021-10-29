import React from 'react';
import { connect } from 'react-redux';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';

const DocumentFilters = ({ searchTerm, onMobile }) => (
    <form className="table-search size-lg-12">
        <Search
            value={searchTerm}
            name="searchTerm"
            placeholder="Search by filename..."
            handleChange={() => {}}
        />
    </form>
);

export default connect(({ shared: { mobileReducer: { onMobile } } }) => ({
    onMobile,
}))(DocumentFilters);
