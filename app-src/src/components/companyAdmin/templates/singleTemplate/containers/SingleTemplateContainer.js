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
        const { isFetching, id, versions, sections, questions } = this.props;
        if (isFetching) return <Loading />;
        else {
            const version = getLatestVersion(id, versions);
            const versSections = getVersionSections(version, sections);
            const sectQuestions = getSectionQuestions(versSections, questions);
            return (
                <SingleTemplate
                    headers={[
                        'Question Name',
                        'Type',
                        'Hidden?',
                        'Required?',
                        'Prefilled?',
                        ''
                    ]}
                    sections={versSections}
                    questions={sectQuestions}
                />
            );
        }
    };

    componentDidMount = () => this.props.fetchAllTemplates();
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
