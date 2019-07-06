import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';

import LabelExamplePage from '../presentational/LabelExamplePage';

class LabelExamplePageContainer extends Component {
    render() {
        return <LabelExamplePage />;
    }
    componentDidMount = () => {
        const { fetchPageData, uuid } = this.props;

        fetchPageData(uuid);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates },
            templateLabelFieldsReducer: { labelFields }
        }
    },
    {
        match: {
            params: { uuid, companyID }
        }
    }
) => ({
    companyID,
    template: templates[uuid],
    uuid,
    labelFields: Object.values(labelFields).filter(
        ({ templateUUID }) => templateUUID === uuid
    )
});
const mapDispatchToProps = (
    dispatch,
    {
        match: {
            params: { companyID }
        }
    }
) => ({
    fetchPageData: templateUUID => {
        dispatch(fetchTemplate(templateUUID));
        dispatch(fetchAllServices());
        dispatch(fetchSingleCompany(companyID));
    }
});
const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelExamplePageContainer);

export default withRouter(WithConnect);
