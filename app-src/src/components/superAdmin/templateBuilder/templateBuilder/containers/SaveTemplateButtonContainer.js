import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SaveTemplateButton from '../presentational/SaveTemplateButton';

class SaveTemplateButtonContainer extends Component {
    render() {
        return (
            <SaveTemplateButton
                saveRequired={true}
                promptMessage={() => 'Are you sure?'}
                handleSave={this.handleSave}
            />
        );
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    handleBeforeUnload = e => {
        e.returnValue = '';
    };

    handleSave = () => {
        const { template, allSections, allQuestions } = this.props;
        const sections = allSections.filter(
            ({ templateUuid }) => templateUuid === template.uuid
        );
        const sectionUuids = sections.map(({ uuid }) => uuid);
        const questions = allQuestions.filter(({ sectionUuid }) =>
            sectionUuids.includes(sectionUuid)
        );

        const newTemplateData = {
            template,
            sections,
            questions
        };

        console.log(newTemplateData);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { saveRequired, templates },
            templateSectionsReducer: { sections },
            templateQuestionsReducer: { questions }
        }
    },
    {
        match: {
            params: { uuid }
        }
    }
) => ({
    saveRequired,
    template: templates[uuid],
    allSections: Object.values(sections),
    allQuestions: Object.values(questions)
});

const WithConnect = connect(mapStateToProps)(SaveTemplateButtonContainer);
export default withRouter(WithConnect);
