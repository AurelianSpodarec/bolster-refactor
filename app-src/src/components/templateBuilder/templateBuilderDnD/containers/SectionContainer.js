import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import { DRAG_TYPES } from 'constants/dragTypes';
import swapQuestionSorts from 'actions/templateBuilder/sync/swapQuestionSorts';

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
}

const mapStateToProps = ({ templateBuilderReducer }, { section }) => ({
    questions: Object.values(templateBuilderReducer.questions)
        .filter(q => q.sectionUuid === section.uuid)
        .sort((a, b) => a.sort - b.sort)
});

const mapDispatchToProps = dispatch => ({
    swapQuestionSorts: (question1Uuid, question2Uuid) => {
        dispatch(swapQuestionSorts(question1Uuid, question2Uuid));
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(SectionContainer);

const questionTarget = {
    drop(props) {
        const { id } = props;
        // const sourceObj = monitor.getItem();
        // if (id !== sourceObj.listId) component.pushCard(sourceObj.card);
        return {
            sectionUuid: id
        };
    }
};

export default DropTarget(
    DRAG_TYPES.QUESTION,
    questionTarget,
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    })
)(WithConnect);
