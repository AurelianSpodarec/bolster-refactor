import React from 'react';
import updateInvoiceFilters from 'actions/superAdmin/invoices/sync/updateInvoiceFilter';
import { connect } from 'react-redux';
import InvoiceFilters from '../presentational/InvoiceFilters';
import fetchInvoicesBySearch from 'actions/superAdmin/invoices/async/fetchInvoicesBySearch';

const invoicesFiltersContainer = ({
    filters: { searchTerm, hasPayed },
    updateInvoiceFilters,
    fetchInvoicesBySearch,
}) => {
    const hasPayedTypes = [
        { text: 'All', value: 0 },
        { text: 'Paid', value: 1 },
        { text: 'Awaiting Payment', value: 2 },
    ];

    return (
        <InvoiceFilters
            searchTerm={searchTerm}
            hasPayedOptions={hasPayedTypes}
            hasPayedOptionSelected={hasPayedTypes[hasPayed]}
            handleChange={handleChange}
            handleSearch={handleSearch}
        />
    );

    function handleChange(name, value) {
        updateInvoiceFilters(name, value);
    }

    function handleSearch(name, value) {
        updateInvoiceFilters(name, value);
        fetchInvoicesBySearch(1, value);
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { filters },
    },
}) => ({ filters });
const mapDispatchToProps = { updateInvoiceFilters, fetchInvoicesBySearch };

export default connect(mapStateToProps, mapDispatchToProps)(invoicesFiltersContainer);
