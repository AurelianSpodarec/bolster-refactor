import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import postTemplate from 'actions/superAdmin/templateBuilder/async/postTemplate';

import SaveTemplateButton from '../presentational/SaveTemplateButton';
import { setDynamicFields } from 'actions/superAdmin/templateBuilder/async/helpers';

class SaveTemplateButtonContainer extends Component {
    render() {
        return (
            <SaveTemplateButton
                saveRequired={true}
                promptMessage={() => 'You have unsaved changes, are you sure?'}
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
        const {
            template,
            allSections,
            allQuestions,
            postTemplate
        } = this.props;
        const sections = allSections.filter(
            ({ templateUUID }) => templateUUID === template.uuid
        );
        const questions = allQuestions.filter(
            ({ templateUUID }) => templateUUID === template.uuid
        );
        const newTemplateData = {
            template,
            sections,
            questions: setDynamicFields(questions)
        };

        console.log(newTemplateData);
        postTemplate(newTemplateData);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates },
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
    template: templates[uuid],
    allSections: Object.values(sections),
    allQuestions: Object.values(questions)
});

const mapDispatchToProps = dispatch => ({
    postTemplate: templateData => {
        dispatch(postTemplate(templateData));
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveTemplateButtonContainer);
export default withRouter(WithConnect);
