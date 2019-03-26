import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import {
    ADD_TEMPLATE_QUESTION,
    RENAME_TEMPLATE_SECTION
} from 'constants/modalTypes';
import showModal from 'actions/generic/modals/sync/showModal';
import addSection from 'actions/templateBuilder/sync/addSection';
import deleteSection from 'actions/templateBuilder/sync/deleteSection';
import renameSection from 'actions/templateBuilder/sync/renameSection';
import addQuestion from 'actions/templateBuilder/sync/addQuestion';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateSection from '../presentational/TemplateSection';

class TemplateSectionContainer extends Component {
    state = {
        section: this.props.section
    };
    render() {
        return (
            <BlockContainer>
                <TemplateSection
                    section={this.props.section}
                    questions={this.props.questions}
                    duplicateSection={this.duplicateSection}
                    deleteSection={this.deleteSection}
                    showAddQuestionModal={this.showAddQuestionModal}
                    showRenameSectionModal={this.showRenameSectionModal}
                />
            </BlockContainer>
        );
    }

    showAddQuestionModal = e => {
        const { showModal, section } = this.props;

        e.preventDefault();

        showModal(ADD_TEMPLATE_QUESTION, {
            sectionUuid: section.uuid
        });
    };

    showRenameSectionModal = e => {
        const { showModal, section } = this.props;

        e.preventDefault();

        showModal(RENAME_TEMPLATE_SECTION, {
            section: section
        });
    };

    deleteSection = e => {
        const { deleteSection } = this.props;

        e.preventDefault();

        deleteSection(this.props.section.uuid);
    };

    duplicateSection = e => {
        const { questions, addSection, addQuestion } = this.props;

        e.preventDefault();
        const newUuid = uuid();

        const newSection = {
            name: 'New Section',
            uuid: newUuid
        };

        questions.forEach(question => {
            addQuestion({
                ...question,
                questionType: question.questionType,
                sectionUuid: newUuid,
                uuid: uuid()
            });
        });
        addSection(newSection);
    };
}

const mapStateToProps = ({ templateBuilderReducer }, { section }) => ({
    questions: Object.values(templateBuilderReducer.questions).filter(
        q => q.sectionUuid === section.uuid
    )
});

const mapDispatchToProps = dispatch => ({
    deleteSection: sectionId => {
        dispatch(deleteSection(sectionId));
    },
    addQuestion: question => {
        dispatch(addQuestion(question));
    },
    addSection: newSection => {
        dispatch(addSection(newSection));
    },
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSectionContainer);
