import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADD_TEMPLATE_QUESTION } from 'constants/modalTypes';
import showModal from 'actions/generic/modals/sync/showModal';
import deleteSection from 'actions/templateBuilder/sync/deleteSection';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateSection from '../presentational/TemplateSection';

class TemplateSectionContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <TemplateSection
                    section={this.props.section}
                    questions={this.props.questions}
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
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateSectionContainer);
