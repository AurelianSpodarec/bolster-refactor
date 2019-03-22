import React, { Component } from 'react';
import { connect } from 'react-redux';

import deleteSection from 'actions/templateBuilder/sync/deleteSection';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateSection from '../presentational/TemplateSection';

class TemplateSectionContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <TemplateSection
                    section={this.props.section}
                    deleteSection={this.deleteSection}
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

const mapDispatchToProps = dispatch => ({
    deleteSection: uuid => {
        dispatch(deleteSection(uuid));
    }
});
export default connect(
    null,
    mapDispatchToProps
)(TemplateSectionContainer);
