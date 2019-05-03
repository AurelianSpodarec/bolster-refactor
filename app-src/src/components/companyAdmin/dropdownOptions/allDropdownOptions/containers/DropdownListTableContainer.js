import React, { Component } from 'react';
import { connect } from 'react-redux';

import DropdownOptionsTable from '../presentational/DropdownOptionsTable';

class DropdownListTableContainer extends Component {
    render() {
        const { isFetching, error, dropdownOptions, title } = this.props;

        return (
            <DropdownOptionsTable
                headers={['Name', 'Is Deleted?', '']}
                dropdownOptions={dropdownOptions}
                isFetching={isFetching}
                error={error}
                title={title}
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        dropdownOptionsReducer: { dropdownOptions, isFetching, error }
    }
}) => ({
    dropdownOptions: Object.values(dropdownOptions) || [],
    isFetching: isFetching,
    error: error
});

export default connect(mapStateToProps)(DropdownListTableContainer);
