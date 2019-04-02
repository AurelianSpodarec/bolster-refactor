import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v1';

import { ADD_TEMPLATE } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
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
            companyID,
            history,
            location: { pathname }
        } = this.props;
        const newUuid = uuid();

        showModal(ADD_TEMPLATE, { companyID, uuid: newUuid });
        history.push(`${pathname}/template/${newUuid}`);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            companiesReducer: { companies }
        }
    },
    { match: { params } }
) => ({
    company: companies[params.id] || {},
    companyID: params.id
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
