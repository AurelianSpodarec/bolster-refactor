import React, { Component } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateSection from '../presentational/TemplateSection';

class TemplateSectionContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <TemplateSection section={this.props.section} />
            </BlockContainer>
        );
    }
}

export default TemplateSectionContainer;
