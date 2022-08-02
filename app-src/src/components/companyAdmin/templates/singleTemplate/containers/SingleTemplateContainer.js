import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleTemplate from '../presentational/SingleTemplate';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { getLatestVersion, getVersionSections, getSectionQuestions } from 'helpers/templates';
import selectQuestion from 'actions/companyAdmin/templates/sync/selectQuestion';
import fetchPinOptions from 'actions/companyAdmin/pinOptions/async/fetchPinOptions';
import fetchPinOptionVersions from 'actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';

class SingleTemplateContainer extends Component {
    render = () => {
        const { isFetching, id, versions, sections, questions } = this.props;
        if (isFetching) return <Loading />;
        else {
            const version = getLatestVersion(id, versions);
            const versSections = getVersionSections(version, sections);
            const sectQuestions = getSectionQuestions(versSections, questions);
            return (
                <SingleTemplate
                    headers={['Question Name', 'Type', 'Required?', '']}
                    sections={versSections}
                    questions={sectQuestions}
                    templateID={id}
                />
            );
        }
    };

    componentDidMount = () => {
        const { selectQuestion, fetchAllTemplates, fetchPinOptions, fetchPinOptionVersions } =
            this.props;
        selectQuestion(0);
        fetchAllTemplates();
        fetchPinOptions();
        fetchPinOptionVersions();
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { templates, isFetching: isFetchingTemplates, error },
            templateSectionsReducer: { sections },
            templateVersionsReducer: { versions },
            templateQuestionsReducer: { questions },
            pinOptionsReducer: { isFetching: isFetchingPinOptions },
            pinOptionVersionsReducer: { isFetching: isFetchingPinOptionVersions },
        },
    },
    ownProps,
) => ({
    templates: Object.values(templates),
    versions: Object.values(versions),
    sections: Object.values(sections),
    questions: Object.values(questions),
    isFetching: isFetchingTemplates || isFetchingPinOptions || isFetchingPinOptionVersions,
    error,
    id: ownProps.match.params.id,
});

const mapDispatchToProps = {
    fetchAllTemplates,
    selectQuestion,
    fetchPinOptions,
    fetchPinOptionVersions,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleTemplateContainer));
