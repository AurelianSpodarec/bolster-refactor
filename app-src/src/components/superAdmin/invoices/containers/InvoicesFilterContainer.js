import React from 'react';
import updateInvoiceFilters from 'actions/superAdmin/invoices/sync/updateInvoiceFilter';
import { connect } from 'react-redux';
import InvoiceFilters from '../presentational/InvoiceFilters';

const invoicesFiltersContainer = ({
    filters: { searchTerm, hasPayed },
    updateInvoiceFilters
}) => {
    const hasPayedTypes = [
        { text: 'All', value: 0 },
        { text: 'Paid', value: 1 },
        { text: 'Awaiting Payment', value: 2 }
    ];

    return (
        <InvoiceFilters
            searchTerm={searchTerm}
            hasPayedOptions={hasPayedTypes}
            hasPayedOptionSelected={hasPayedTypes[hasPayed]}
            handleChange={handleChange}
        />
    );

    function handleChange(name, value) {
        updateInvoiceFilters(name, value);
    }
};
const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { filters }
    }
}) => ({ filters });
const mapDispatchToProps = { updateInvoiceFilters };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(invoicesFiltersContainer);
