import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { ADD_TEMPLATE_QUESTION } from 'constants/modalTypes';
import showModal from 'actions/generic/modals/sync/showModal';
import addSection from 'actions/templateBuilder/sync/addSection';
import deleteSection from 'actions/templateBuilder/sync/deleteSection';
import duplicateSection from 'actions/templateBuilder/sync/duplicateSection';
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
                    showModal={e => {
                        e.preventDefault();
                        this.props.showModal(ADD_TEMPLATE_QUESTION, {
                            sectionUuid: this.props.section.uuid
                        });
                    }}
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
        const { addSection, section, sectionsCount } = this.props;

        e.preventDefault();

        const newSection = {
            name: section.name + ' ' + sectionsCount,
            uuid: uuid()
        };

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
    duplicateSection: section => {
        dispatch(duplicateSection(section));
    },
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSectionContainer);
