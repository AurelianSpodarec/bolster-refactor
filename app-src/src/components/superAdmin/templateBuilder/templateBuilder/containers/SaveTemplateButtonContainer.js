import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SaveTemplateButton from '../presentational/SaveTemplateButton';
import resetSaveRequired from 'actions/superAdmin/templateBuilder/sync/resetSaveRequired';

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
            resetSaveRequired
        } = this.props;
        const sections = allSections.filter(
            ({ templateUuid }) => templateUuid === template.uuid
        );
        const questions = allQuestions.filter(
            ({ templateUuid }) => templateUuid === template.uuid
        );
        const newTemplateData = {
            template,
            sections,
            questions
        };

        resetSaveRequired();
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

const mapDispatchToProps = dispatch => ({
    resetSaveRequired: () => {
        dispatch(resetSaveRequired());
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveTemplateButtonContainer);
export default withRouter(WithConnect);
