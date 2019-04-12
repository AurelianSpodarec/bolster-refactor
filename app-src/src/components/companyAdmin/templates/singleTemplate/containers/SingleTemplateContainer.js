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
            console.log(id);
            const version = getLatestVersion(id, versions);
            console.log(version);
            const versionSections = getVersionSections(version, sections);
            console.log(versionSections);
            const sectionQuestions = getSectionQuestions(
                versionSections,
                questions
            );
            console.log(sectionQuestions);
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
