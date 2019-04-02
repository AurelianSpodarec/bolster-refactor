import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import uuid from 'uuid/v1';

import {
    ADD_TEMPLATE_QUESTION,
    RENAME_TEMPLATE_SECTION
} from 'constants/shared/modalTypes';
import { DRAG_TYPES } from 'constants/superAdmin/dragTypes';
import swapQuestionSorts from 'actions/superAdmin/templateBuilder/sync/swapQuestionSorts';
import changeQuestionSection from 'actions/superAdmin/templateBuilder/sync/changeQuestionSection';

import Section from '../presentational/Section';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import addSection from 'actions/superAdmin/templateBuilder/sync/addSection';
import deleteSection from 'actions/superAdmin/templateBuilder/sync/deleteSection';
import addQuestion from 'actions/superAdmin/templateBuilder/sync/addQuestion';

class SectionContainer extends Component {
    render() {
        const {
            section,
            questions,
            canDrop,
            isOver,
            connectDropTarget,
            deleteSection,
            showAddQuestModal,
            showRenameSectModal
        } = this.props;

        return connectDropTarget(
            <div>
                <Section
                    isActive={canDrop && isOver}
                    section={section}
                    questions={questions}
                    moveQuestion={this.moveQuestion}
                    deleteSection={() => deleteSection(section.uuid)}
                    showAddQuestModal={() => showAddQuestModal(section.uuid)}
                    showRenameSectModal={() => showRenameSectModal(section)}
                    duplicateSection={this.duplicateSection}
                />
            </div>
        );
    }

    moveQuestion = (dragIndex, hoverIndex) => {
        const { questions, swapQuestionSorts } = this.props;
        const question1 = questions[dragIndex];
        const question2 = questions[hoverIndex];
        swapQuestionSorts(question1.uuid, question2.uuid);
    };

    changeSection = question => {
        const { changeQuestionSection, section, questions } = this.props;
        const newSort = Math.max(0, ...questions.map(q => q.sort)) + 1;

        changeQuestionSection(question.uuid, section.uuid, newSort);
    };

    duplicateSection = e => {
        const { questions, addSection, addQuestion, section } = this.props;

        e.preventDefault();
        const newUuid = uuid();

        const newSection = {
            ...section,
            name: `${section.name} - (copy)`,
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

const questionTarget = {
    drop(props, monitor, component) {
        const { section } = props;
        const sourceObj = monitor.getItem();
        if (section.uuid !== sourceObj.sectionUuid) {
            component.changeSection(sourceObj.question);
        }
        return {
            sectionUuid: section.uuid
        };
    }
};

const WithDragAndDrop = DropTarget(
    DRAG_TYPES.QUESTION,
    questionTarget,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    })
)(SectionContainer);

const mapStateToProps = (
    { superAdmin: { templateQuestionsReducer } },
    { section }
) => ({
    questions: Object.values(templateQuestionsReducer.questions)
        .filter(q => q.sectionUuid === section.uuid)
        .sort((a, b) => a.sort - b.sort)
});

const mapDispatchToProps = dispatch => ({
    swapQuestionSorts: (question1Uuid, question2Uuid) => {
        dispatch(swapQuestionSorts(question1Uuid, question2Uuid));
    },
    changeQuestionSection: (questionUuid, sectionUuid, sort) => {
        dispatch(changeQuestionSection(questionUuid, sectionUuid, sort));
    },
    deleteSection: sectionUuid => {
        dispatch(deleteSection(sectionUuid));
    },
    addQuestion: question => {
        dispatch(addQuestion(question));
    },
    addSection: newSection => {
        dispatch(addSection(newSection));
    },
    showAddQuestModal: sectionUuid => {
        dispatch(showModal(ADD_TEMPLATE_QUESTION, { sectionUuid }));
    },
    showRenameSectModal: section => {
        dispatch(showModal(RENAME_TEMPLATE_SECTION, { section }));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithDragAndDrop);
