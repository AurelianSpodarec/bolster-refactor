import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormExamplePage from '../presentational/FormExamplePage';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import { isEmpty } from 'helpers/generic';

class FormExamplePageContainer extends Component {
    render() {
        return <FormExamplePage />;
    }

    componentDidMount = () => {
        const { temmplateUUID, fetchPageData, labelFields } = this.props;

        if (isEmpty(labelFields)) fetchPageData(temmplateUUID);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templateLabelFieldsReducer: { labelFields }
        }
    },
    { match: { params } }
) => ({
    labelFields: Object.values(labelFields).filter(
        ({ templateuuid }) => String(templateuuid) === params.uuid
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
)(FormExamplePageContainer);

export default withRouter(WithConnect);
