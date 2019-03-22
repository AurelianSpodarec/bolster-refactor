import React, { Component } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateSection from '../presentational/TemplateSection';

class TemplateSectionContainer extends Component {
    render() {
        const { name } = this.props;

        return (
            <BlockContainer>
                <TemplateSection name={name} />
            </BlockContainer>
        );
    }
}

export default TemplateSectionContainer;
