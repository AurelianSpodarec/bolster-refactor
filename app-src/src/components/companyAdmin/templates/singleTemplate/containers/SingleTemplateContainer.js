import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SingleTemplate from '../presentational/SingleTemplate';
import fetchAllTemplates from 'actions/companyAdmin/templates/async/fetchAllTemplates';
import Loading from 'components/shared/generic/misc/presentational/Loading';

class SingleTemplateContainer extends Component {
    render = () => {
        if (!this.props.isFetching) {
            const latestVersion = this.getLatestVersion();
            const versionSections = this.getVersionSections(latestVersion);
            const sectionQuestions = this.getSectionQuestions(versionSections);
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

    getLatestVersion = () => {
        const { versions, id } = this.props;
        const latestVersion = [...versions]
            .filter(({ templateID }) => +templateID === +id)
            .sort((a, b) => a.id - b.id)[0];
        return latestVersion;
    };

    getVersionSections = version =>
        this.props.sections
            .filter(({ templateVersionID }) => templateVersionID === version.id)
            .sort((a, b) => a.sort - b.sort);

    getSectionQuestions = sections => {
        const { questions } = this.props;
        const sectionIDs = sections.map(({ id }) => id);
        const sectionQuestions = sectionIDs.reduce(
            (acc, id) => ({
                ...acc,
                [id]: questions
                    .filter(({ templateSectionID }) => templateSectionID === id)
                    .sort((a, b) => a.sort - b.sort)
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
