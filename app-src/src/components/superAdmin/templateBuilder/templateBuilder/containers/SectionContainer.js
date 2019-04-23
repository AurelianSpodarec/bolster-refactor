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
import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
import deleteSection from 'actions/superAdmin/templateBuilder/sync/deleteSection';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';
import deleteQuestion from 'actions/superAdmin/templateBuilder/sync/deleteQuestion';

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
            showRenameSectModal,
            sections
        } = this.props;

        let tooltipMessage;
        if (sections.length <= 1)
            tooltipMessage = 'You must have at least one section.';
        else if (!this._isDeletable())
            tooltipMessage =
                'This section has prerequisites with dependants in other sections.';

        return connectDropTarget(
            <div className="size-lg-12">
                <Section
                    tooltipMessage={tooltipMessage}
                    isActive={canDrop && isOver}
                    section={section}
                    questions={questions}
                    moveQuestion={this.moveQuestion}
                    deleteSection={() => deleteSection(section.uuid)}
                    showAddQuestModal={() =>
                        showAddQuestModal(section.uuid, section.templateUUID)
                    }
                    showRenameSectModal={() => showRenameSectModal(section)}
                    duplicateSection={this.duplicateSection}
                />
            </div>
        );
    }

    _isDeletable = () => {
        const {
            templateQuestions,
            questions: sectionQuestions,
            section,
            sections
        } = this.props;
        const sectionQuestionUuids = sectionQuestions.map(({ uuid }) => uuid);
        const otherQuestionPrereqUuids = templateQuestions
            .filter(q => q.sectionUUID !== section.uuid)
            .map(q => q.prereqUUID);

        return (
            otherQuestionPrereqUuids.every(
                prereqUUID => !sectionQuestionUuids.includes(prereqUUID)
            ) && sections.length > 1
        );
    };

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
        const { questions, setSection, setQuestion, section } = this.props;

        e.preventDefault();
        const newUuid = uuid();

        const newSection = {
            ...section,
            name: `${section.name} - (copy)`,
            uuid: newUuid
        };

        questions.forEach(question => {
            setQuestion({
                ...question,
                questionType: question.questionType,
                sectionUUID: newUuid,
                uuid: uuid()
            });
        });
        setSection(newSection);
    };
}

const questionTarget = {
    drop(props, monitor, component) {
        const { section } = props;
        const sourceObj = monitor.getItem();
        if (section.uuid !== sourceObj.sectionUUID) {
            component.changeSection(sourceObj.question);
        }
        return {
            sectionUUID: section.uuid
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
    { superAdmin: { templateQuestionsReducer, templateSectionsReducer } },
    { section }
) => ({
    templateQuestions: Object.values(templateQuestionsReducer.questions).filter(
        q => q.templateUUID === section.templateUUID
    ),
    questions: Object.values(templateQuestionsReducer.questions)
        .filter(q => q.sectionUUID === section.uuid)
        .sort((a, b) => a.sort - b.sort),
    sections: Object.values(templateSectionsReducer.sections).filter(
        s => s.templateUUID === section.templateUUID
    )
});

const mapDispatchToProps = dispatch => ({
    swapQuestionSorts: (question1Uuid, question2Uuid) => {
        dispatch(swapQuestionSorts(question1Uuid, question2Uuid));
    },
    changeQuestionSection: (questionUUID, sectionUUID, sort) => {
        dispatch(changeQuestionSection(questionUUID, sectionUUID, sort));
    },
    deleteSection: sectionUUID => {
        dispatch(deleteSection(sectionUUID));
    },
    setQuestion: question => {
        dispatch(setQuestion(question));
    },
    setSection: newSection => {
        dispatch(setSection(newSection));
    },
    showAddQuestModal: (sectionUUID, templateUUID) => {
        dispatch(
            showModal(ADD_TEMPLATE_QUESTION, { sectionUUID, templateUUID })
        );
    },
    showRenameSectModal: section => {
        dispatch(showModal(RENAME_TEMPLATE_SECTION, { section }));
    },
    deleteQuestion: questionUUID => {
        dispatch(deleteQuestion(questionUUID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithDragAndDrop);
