import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import { DRAG_TYPES } from 'constants/dragTypes';
import swapQuestionSorts from 'actions/templateBuilder/sync/swapQuestionSorts';
import changeQuestionSection from 'actions/templateBuilder/sync/changeQuestionSection';

import Section from '../presentational/Section';

class SectionContainer extends Component {
    render() {
        const {
            section,
            questions,
            canDrop,
            isOver,
            connectDropTarget
        } = this.props;

        return connectDropTarget(
            <div>
                <Section
                    isActive={canDrop && isOver}
                    section={section}
                    questions={questions}
                    moveQuestion={this.moveQuestion}
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
}

const mapStateToProps = ({ templateBuilderReducer }, { section }) => ({
    questions: Object.values(templateBuilderReducer.questions)
        .filter(q => q.sectionUuid === section.uuid)
        .sort((a, b) => a.sort - b.sort)
});

const mapDispatchToProps = dispatch => ({
    swapQuestionSorts: (question1Uuid, question2Uuid) => {
        dispatch(swapQuestionSorts(question1Uuid, question2Uuid));
    },
    changeQuestionSection: (questionUuid, sectionUuid, sort) => {
        dispatch(changeQuestionSection(questionUuid, sectionUuid, sort));
    }
});

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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithDragAndDrop);
