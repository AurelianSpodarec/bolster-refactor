import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleTemplate from '../presentational/SingleTemplate';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';

class SingleTemplateContainer extends Component {
    render() {
        const latestVersion = this.getLatestVersion();
        const latestVersionSections = this.getVersionSections(latestVersion);
        const sectionQuestions = this.getSectionQuestions(
            latestVersionSections
        );
        const headers = [
            'Question Name',
            'Hidden?',
            'Required?',
            'Prefilled?',
            'Type',
            'Group Key',
            'Char limit'
        ];

        return (
            <SingleTemplate
                headers={headers}
                version={latestVersion}
                sections={latestVersionSections}
                questions={sectionQuestions}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchAllTemplates();
    };

    getLatestVersion = () => {
        const { versions, id, isFetching } = this.props;
        if (!isFetching) {
            const filteredVersionIDs = versions
                .filter(version => +version.templateID === +id)
                .map(({ id }) => id);
            const latestVersionID = Math.max(...filteredVersionIDs);
            const latestVersion = versions.find(
                ({ id }) => id === latestVersionID
            );
            return latestVersion;
        }
    };

    getVersionSections = version =>
        this.props.sections.filter(
            ({ templateVersionID }) => templateVersionID === version.id
        );

    getSectionQuestions = sections => {
        const { questions } = this.props;
        const sectionIDs = sections.map(({ id }) => id);
        const sectionQuestions = sectionIDs.reduce(
            (acc, id) => ({
                ...acc,
                [id]: questions.filter(
                    ({ templateSectionID }) => templateSectionID === id
                )
            }),
            {}
        );
        return sectionQuestions;
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
