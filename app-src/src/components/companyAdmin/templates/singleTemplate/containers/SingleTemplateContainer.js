import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleTemplate from '../presentational/SingleTemplate';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import {
    getLatestVersion,
    getVersionSections,
    getSectionQuestions
} from 'helpers/templates';

class SingleTemplateContainer extends Component {
    render = () => {
        if (!this.props.isFetching) {
            const { id, versions, sections, questions } = this.props;
            const latestVersion = getLatestVersion(id, versions);
            const versionSections = getVersionSections(latestVersion, sections);
            const sectionQuestions = getSectionQuestions(
                versionSections,
                questions
            );
            const headers = [
                'Question Name',
                'Hidden?',
                'Required?',
                'Prefilled?',
                'Type',
                'Group Key'
            ];
            return (
                <SingleTemplate
                    headers={headers}
                    sections={versionSections}
                    questions={sectionQuestions}
                />
            );
        } else {
            return <Loading />;
        }
    };

    componentDidMount = () => {
        this.props.fetchAllTemplates();
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            templatesReducer: { templates, isFetching, error },
            templateSectionsReducer: { sections },
            templateVersionsReducer: { versions },
            templateQuestionsReducer: { questions }
        }
    },
    ownProps
) => ({
    templates: Object.values(templates),
    versions: Object.values(versions),
    sections: Object.values(sections),
    questions: Object.values(questions),
    isFetching,
    error,
    id: ownProps.match.params.id
});

const mapDispatchToProps = dispatch => ({
    fetchAllTemplates: () => dispatch(fetchAllTemplates())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SingleTemplateContainer)
);
