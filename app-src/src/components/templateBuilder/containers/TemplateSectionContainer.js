import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import showModal from 'actions/generic/modals/sync/showModal';
import addSection from 'actions/templateBuilder/sync/addSection';
import deleteSection from 'actions/templateBuilder/sync/deleteSection';
import duplicateQuestions from 'actions/templateBuilder/sync/duplicateQuestions';
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
                    showModal={this.props.showModal}
                />
            </BlockContainer>
        );
    }

    deleteSection = e => {
        const { deleteSection } = this.props;

        e.preventDefault();

        deleteSection(this.props.section.uuid);
    };

    duplicateSection = e => {
        const { addSection, section, sectionsCount, questions } = this.props;

        e.preventDefault();
        const newUuid = uuid();

        const newSection = {
            name: section.name + ' ' + sectionsCount,
            uuid: newUuid
        };

        const duplicateQuestions = Object.values(questions).map(question => ({
            isRequired: question.isRequired,
            name: question.name,
            preUuid: question.preUuid,
            preValue: question.preValue,
            questionType: question.questionType,
            sectionUuid: newUuid,
            uuid: uuid()
        }));

        addSection(newSection);
    };
}

const mapStateToProps = ({ templateBuilderReducer }, { section }) => ({
    questions: Object.values(templateBuilderReducer.questions).filter(
        q => q.sectionUuid === section.uuid
    ),
    sectionsCount: Object.values(templateBuilderReducer.sections).length
});

const mapDispatchToProps = dispatch => ({
    deleteSection: sectionId => {
        dispatch(deleteSection(sectionId));
    },
    addSection: newSection => {
        dispatch(addSection(newSection));
    },
    duplicateQuestions: questions => {
        dispatch(duplicateQuestions(questions));
    },
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSectionContainer);
