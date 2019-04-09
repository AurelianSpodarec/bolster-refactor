import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleInvoice from 'actions/companyAdmin/invoices/async/fetchSingleInvoiceItems';
import fetchSingleInvoiceItems from 'actions/companyAdmin/invoices/async/fetchSingleInvoice';

import SingleInvoice from '../presentational/SingleInvoice';

class SingleInvoiceContainer extends Component {
    render() {
        return <SingleInvoice id={this.props.id} />;
    }

    componentDidMount = () => {
        this.props.fetchInvoiceAndItems(this.props.id);
    };
}

const mapStateToProps = (_, { match }) => ({
    id: match.params.id
});

const mapDispatchToProps = dispatch => ({
    fetchInvoiceAndItems: id => {
        dispatch(fetchSingleInvoice(id));
        dispatch(fetchSingleInvoiceItems(id));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SingleInvoiceContainer)
);
