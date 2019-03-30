import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

import Question from '../presentational/Question';
import { DRAG_TYPES } from 'constants/dragTypes';

class QuestionContainer extends Component {
    render() {
        const {
            question,
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        return connectDragSource(
            connectDropTarget(
                <div ref={ref => (this.question = ref)}>
                    <Question
                        connectDragSource={connectDragSource}
                        connectDropTarget={connectDropTarget}
                        isDragging={isDragging}
                        question={question}
                    />
                </div>
            )
        );
    }
}

const questionSource = {
    beginDrag(props) {
        return {
            index: props.index,
            sectionUuid: props.sectionUuid,
            question: props.question
        };
    }

    // endDrag(props, monitor) {
    //     const item = monitor.getItem();
    //     const dropResult = monitor.getDropResult();

    //     if (dropResult && dropResult.sectionUuid !== item.sectionUuid) {
    //         props.removeCard(item.index);
    //     }
    // }
};

const questionTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        const sourceSectionUuid = monitor.getItem().sectionUuid;

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
        if (props.sectionUuid === sourceSectionUuid) {
            props.moveQuestion(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex;
        }
    }
};

export default flow(
    DropTarget(DRAG_TYPES.QUESTION, questionTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource(DRAG_TYPES.QUESTION, questionSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(QuestionContainer);
