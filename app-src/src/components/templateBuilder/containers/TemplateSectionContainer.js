import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { DragSource } from 'react-dnd';

import { DRAG_TYPES } from 'constants/dragTypes';
import showModal from 'actions/generic/modals/sync/showModal';
import addSection from 'actions/templateBuilder/sync/addSection';
import deleteSection from 'actions/templateBuilder/sync/deleteSection';
import addQuestion from 'actions/templateBuilder/sync/addQuestion';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateSection from '../presentational/TemplateSection';

class TemplateSectionContainer extends Component {
    state = {
        section: this.props.section
    };

    render() {
        const {
            section,
            questions,
            showModal,
            isDragging,
            dragSource
        } = this.props;
        const opacity = isDragging ? 0.5 : 1;
        return dragSource(
            <div style={{ opacity }}>
                <BlockContainer>
                    <TemplateSection
                        section={section}
                        questions={questions}
                        showModal={showModal}
                        duplicateSection={this.duplicateSection}
                        deleteSection={this.deleteSection}
                    />
                </BlockContainer>
            </div>
        );
    }

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

const dragSourceSpec = {
    beginDrag: props => ({ ...props })
};

const collect = (connect, monitor) => ({
    dragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

const WithDragSource = DragSource(DRAG_TYPES.SECTION, dragSourceSpec, collect)(
    TemplateSectionContainer
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WithDragSource);
