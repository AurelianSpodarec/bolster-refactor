import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { DropTarget, useDrag, useDrop } from 'react-dnd';
import newUuid from 'uuid/v1';

import {
    ADD_TEMPLATE_QUESTION,
    RENAME_TEMPLATE_SECTION,
    SET_TEMPLATE_IMAGE,
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
import { QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';

const SectionContainer = ({
    section,
    sections,
    questions,
    canDrop,
    isOver,
    connectDropTarget,
    deleteSection,
    showAddQuestModal,
    showRenameSectModal,
    templateQuestions,
    swapQuestionSorts,
    setQuestion,
    setSection,
    showModal,
    i,
    findSection,
    moveSection,
    hovered,
    isSortingSections,
}) => {
    const ref = useRef(null);
    const { uuid } = section;
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'SECTION', uuid, originalIndex: i, index: i },
        collect: handleCollect,
    });

    const [, drop] = useDrop({
        accept: 'SECTION',
        canDrop: () => false,
        hover: handleHover,
    });

    return connectDropTarget(
        <div className="size-lg-12" style={isDragging ? { opacity: 0 } : {}}>
            <Section
                dragRef={node => {
                    drag(drop(node));
                    ref.current = node;
                }}
                tooltipMessage={_getTooltip()}
                isActive={canDrop && isOver}
                section={section}
                questions={questions}
                moveQuestion={moveQuestion}
                deleteSection={() => deleteSection(section.uuid)}
                showAddQuestModal={() => showAddQuestModal(section.uuid, section.templateUUID)}
                showRenameSectModal={() => showRenameSectModal(section)}
                duplicateSection={duplicateSection}
                showAddImageModal={showAddImageModal}
                hovered={hovered}
                isSortingSections={isSortingSections}
            />
        </div>,
    );

    function _getTooltip() {
        const includesStatus = !!questions.filter(
            s => s.questionType + '' === QUESTION_TYPE_VALUES.STATUS + '',
        ).length;

        let tooltipMessage;
        if (sections.length <= 1) tooltipMessage = 'You must have at least one section.';
        else if (!_isDeletable())
            tooltipMessage = 'This section has prerequisites with dependants in other sections.';
        else if (includesStatus) tooltipMessage = "This section contains the 'Status' question ";

        return tooltipMessage;
    }

    function _isDeletable() {
        const sectionQuestionUuids = questions.map(({ uuid }) => uuid);
        const otherQuestionPrereqUuids = templateQuestions
            .filter(q => q.sectionUUID !== section.uuid)
            .map(q => q.prereqUUID);

        return (
            otherQuestionPrereqUuids.every(
                prereqUUID => !sectionQuestionUuids.includes(prereqUUID),
            ) && sections.length > 1
        );
    }

    function moveQuestion(dragIndex, hoverIndex) {
        const items = [...questions].sort((a, b) => a.sort - b.sort);
        const [item] = items.splice(dragIndex, 1);
        items.splice(hoverIndex, 0, item);
        const sorted = items.map((x, i) => ({ ...x, sort: i + 1 }));

        swapQuestionSorts(sorted);
    }

    function duplicateSection(e) {
        e.preventDefault();
        const newSectionUuid = newUuid();
        const newSection = {
            ...section,
            name: `${section.name} - (copy)`,
            uuid: newSectionUuid,
        };

        questions.forEach(question => {
            if (question.questionType + '' !== QUESTION_TYPE_VALUES.STATUS + '') {
                setQuestion({
                    ...question,
                    questionType: question.questionType,
                    sectionUUID: newSectionUuid,
                    uuid: newUuid(),
                });
            }
        });
        setSection(newSection);
    }

    function showAddImageModal() {
        const maxSort = questions.reduce((max, q) => Math.max(max, q.sort), 0);

        showModal(SET_TEMPLATE_IMAGE, {
            sectionUUID: section.uuid,
            templateUUID: section.templateUUID,
            sort: maxSort + 1,
        });
    }

    function handleHover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragID = item.uuid;
        const dragIndex = item.index;
        const hoverIndex = i;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        moveSection(dragID, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
    }

    function handleCollect(monitor) {
        return {
            isDragging: monitor.isDragging(),
        };
    }
};

const questionTarget = {
    drop(props, monitor) {
        const { section, questions, changeQuestionSection } = props;
        const sourceObj = monitor.getItem();
        if (section.uuid !== sourceObj.sectionUUID) {
            const newSort = Math.max(0, ...questions.map(q => q.sort)) + 1;
            changeQuestionSection(sourceObj.question.uuid, section.uuid, newSort);
        }
        return {
            sectionUUID: section.uuid,
        };
    },
};

const WithDragAndDrop = DropTarget(DRAG_TYPES.QUESTION, questionTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(SectionContainer);

const mapStateToProps = (
    { superAdmin: { templateQuestionsReducer, templateSectionsReducer } },
    { section },
) => ({
    templateQuestions: Object.values(templateQuestionsReducer.questions).filter(
        q => q.templateUUID === section.templateUUID,
    ),
    questions: Object.values(templateQuestionsReducer.questions)
        .filter(q => q.sectionUUID === section.uuid)
        .sort((a, b) => a.sort - b.sort),
    sections: Object.values(templateSectionsReducer.sections).filter(
        s => s.templateUUID === section.templateUUID,
    ),
    isSortingSections: templateSectionsReducer.isSorting,
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
        dispatch(showModal(ADD_TEMPLATE_QUESTION, { sectionUUID, templateUUID }));
    },
    showRenameSectModal: section => {
        dispatch(showModal(RENAME_TEMPLATE_SECTION, { section }));
    },
    deleteQuestion: questionUUID => {
        dispatch(deleteQuestion(questionUUID));
    },
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(WithDragAndDrop);
