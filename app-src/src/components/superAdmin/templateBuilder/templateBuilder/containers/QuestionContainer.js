import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import uuid from 'uuid/v1';

import { EDIT_TEMPLATE_QUESTION } from 'constants/shared/modalTypes';
import { DRAG_TYPES } from 'constants/superAdmin/dragTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import deleteQuestion from 'actions/superAdmin/templateBuilder/sync/deleteQuestion';

import Question from '../presentational/Question';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';

class QuestionContainer extends Component {
    render() {
        const {
            questions,
            question,
            isDragging,
            connectDragSource,
            connectDropTarget,
            showEditQuesModel,
            deleteQuestion
        } = this.props;
        const { uuid } = question;
        const isPrereq = questions.some(
            item => item.prereqUUID === question.uuid
        );

        return connectDragSource(
            connectDropTarget(
                <div className="size-lg-12" ref={ref => (this.question = ref)}>
                    <Question
                        isPrereq={isPrereq}
                        connectDragSource={connectDragSource}
                        connectDropTarget={connectDropTarget}
                        isDragging={isDragging}
                        question={question}
                        showEditQuesModel={() => showEditQuesModel(question)}
                        handleDuplicateQuestion={() => this.handleDuplicateQuestion(question)}
                        deleteQuestion={() => deleteQuestion(uuid)}
                    />
                </div>
            )
        );
    }

    handleDuplicateQuestion = questionToCopy => {
        const { setQuestion } = this.props;

        const newUuid = uuid();

        const newQuestion = {
            ...questionToCopy,
            name: questionToCopy.name + ' - (Copy)',
            uuid: newUuid
        };

        setQuestion(newQuestion);
    }
}

const questionSource = {
    beginDrag(props) {
        return {
            index: props.index,
            sectionUUID: props.sectionUUID,
            question: props.question
        };
    }
};

const questionTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        const sourceSectionUuid = monitor.getItem().sectionUUID;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = component.question.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

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
        if (props.sectionUUID === sourceSectionUuid) {
            props.moveQuestion(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex;
        }
    }
};

const WithDragAndDrop = flow(
    DropTarget(DRAG_TYPES.QUESTION, questionTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource(DRAG_TYPES.QUESTION, questionSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(QuestionContainer);

const mapStateToProps = ({ superAdmin: { templateQuestionsReducer } }) => ({
    questions: Object.values(templateQuestionsReducer.questions)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    showEditQuesModel: question => {
        const {
            match: { params }
        } = ownProps;
        dispatch(
            showModal(EDIT_TEMPLATE_QUESTION, {
                question,
                templateUUID: params.uuid
            })
        );
    },
    deleteQuestion: uuid => {
        dispatch(deleteQuestion(uuid));
    },
    setQuestion: question => {
        dispatch(setQuestion(question));
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(WithDragAndDrop);

export default withRouter(WithConnect);
