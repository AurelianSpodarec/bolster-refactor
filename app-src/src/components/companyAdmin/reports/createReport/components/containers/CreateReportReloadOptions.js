import getCompanyReportOptions from 'actions/companyAdmin/reports/async/getCompanyReportOptions';
import getOperativeOptions from 'actions/companyAdmin/reports/async/getOperativeOptions';
import getServiceReportOptions from 'actions/companyAdmin/reports/async/getServiceReportOptions';
import getTemplateReportOptions from 'actions/companyAdmin/reports/async/getTemplateReportOptions';
import postCustomFilters from 'actions/companyAdmin/reports/async/postCustomFilters';
import { isDifferent } from 'helpers/generic';
import _ from 'lodash';
import { Component } from 'react';
import { connect } from 'react-redux';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

class CreateReportReloadOptions extends Component {
    render() {
        return null;
    }

    componentDidMount() {}

    componentDidUpdate({ postBody: prevPostBody }) {
        const { postBody } = this.props;

        if (
            isDifferent(postBody.hierarchyType, prevPostBody.hierarchyType) ||
            isDifferent(postBody.hierarchyID, prevPostBody.hierarchyID) ||
            isDifferent(postBody.pinBoundingBoxes, prevPostBody.pinBoundingBoxes) ||
            isDifferent(postBody.companyUserIDs, prevPostBody.companyUserIDs) ||
            isDifferent(postBody.fromDateInclusive, prevPostBody.fromDateInclusive) ||
            isDifferent(postBody.endDate, prevPostBody.endDate) ||
            isDifferent(postBody.serviceID, prevPostBody.serviceID) ||
            isDifferent(postBody.templateID, prevPostBody.templateID) ||
            isDifferent(postBody.status, prevPostBody.status) ||
            isDifferent(postBody.createdByCompanyID, prevPostBody.createdByCompanyID) ||
            isDifferent(postBody.questionFilters, prevPostBody.questionFilters) ||
            isDifferent(postBody.hasQuestions, prevPostBody.hasQuestions) ||
            isDifferent(postBody.reportHistories, prevPostBody.reportHistories)
        ) {
            this.postFilters();
        }
    }

    postFilters = async () => {
        const {
            postCustomFilters,
            getOperativeOptions,
            getTemplateOptions,
            getServiceReportOptions,
            getCompanyOptions,
            postBody,
        } = this.props;

        if (postBody.hasQuestions) {
            return postCustomFilters(postBody);
        }

        await getOperativeOptions(postBody);
        await getTemplateOptions(postBody);
        await getServiceReportOptions(postBody);
        await getCompanyOptions(postBody);
    };
}

const mapState = (state, ownProps) => ({
    postBody: ownProps.getPostBody(),
});

const mapDispatch = {
    postCustomFilters,
    getOperativeOptions,
    getTemplateReportOptions,
    getCompanyReportOptions,
    getServiceReportOptions,
};

const WithConnect = connect(mapState, mapDispatch)(CreateReportReloadOptions);

export default withUpdateOnChange(WithConnect);
