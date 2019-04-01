import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v1';

import { ADD_TEMPLATE } from 'constants/modalTypes';
import showModal from 'actions/generic/modals/sync/showModal';
import CompanyHeader from '../presentational/CompanyHeader';

class CompanyHeaderContainer extends Component {
    render() {
        const { company } = this.props;
        return (
            <CompanyHeader
                company={company}
                showAddTemplateModal={this.showAddTemplateModal}
            />
        );
    }

    showAddTemplateModal = () => {
        const {
            showModal,
            company,
            history,
            location: { pathname }
        } = this.props;
        const newUuid = uuid();

        showModal(ADD_TEMPLATE, { companyID: company.id, uuid: newUuid });
        history.push(`${pathname}/template/${newUuid}`);
    };
}

const mapStateToProps = ({ companiesReducer }, { match }) => ({
    company: companiesReducer.companies[match.params.id] || {}
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CompanyHeaderContainer)
);
