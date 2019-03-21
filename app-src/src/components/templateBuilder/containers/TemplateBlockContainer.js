import React, { Component } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplateBlock from '../presentational/TemplateBlock';

class TemplateBlockContainer extends Component {
    render() {
        return (
            <BlockContainer>
                <TemplateBlock />
            </BlockContainer>
        );
    }
}

export default TemplateBlockContainer;
