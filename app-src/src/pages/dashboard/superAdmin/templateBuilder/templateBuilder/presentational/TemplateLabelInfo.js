import React from 'react';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import LabelFieldList from './LabelFieldList';

const TemplateLabelInfo = ({ showSetLabelsModal, fields }) => (
    <div className="template-block size-lg-12">
        <BlockContainer>
            <BlockHeading classes="w-table" title="Label Fields">
                <button className="button blue" onClick={showSetLabelsModal}>
                    Update
                </button>
            </BlockHeading>
            <LabelFieldList fields={[...fields].sort((a, b) => a.key - b.key)} />
        </BlockContainer>
    </div>
);

export default TemplateLabelInfo;
