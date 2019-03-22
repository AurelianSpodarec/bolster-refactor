import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADD_TEMPLATE_QUESTION } from 'constants/modalTypes';
import showModal from 'actions/generic/modals/sync/showModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateSection from '../presentational/TemplateSection';

class TemplateSectionContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <TemplateSection
                    section={this.props.section}
                    questions={this.props.questions}
                    showModal={e => {
                        e.preventDefault();
                        this.props.dispatch(
                            showModal(ADD_TEMPLATE_QUESTION, {
                                sectionUuid: this.props.section.uuid
                            })
                        );
                    }}
                />
            </BlockContainer>
        );
    }
}

export default connect(({ templateBuilderReducer }, { section }) => ({
    questions: Object.values(templateBuilderReducer.questions).filter(
        q => q.sectionUuid === section.uuid
    )
}))(TemplateSectionContainer);
