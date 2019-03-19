import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PinImagesContainer from '../containers/PinImagesContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const PinDetails = ({
    pinHistory,
    historyCount,
    historyVersion,
    error,
    isFetching
}) => (
    <>
        <BlockContainer
            heading="Pin options"
            error={error}
            isFetching={isFetching}
            isEmpty={!pinHistory.id}
        >
            <FieldOutput
                title="ID"
                description={pinHistory.id}
                fieldClass="no-h-padding"
            />
            <FieldOutput
                title="Type"
                description={pinHistory.type}
                fieldClass="no-h-padding"
            />

            <FieldOutput
                title="Added by"
                description={pinHistory.addedBy}
                fieldClass="no-h-padding"
            />
            <FieldOutput
                title="Status"
                description={pinHistory.status}
                fieldClass="no-h-padding"
            />
            <div className="field-output no-h-padding size-lg-12">
                <label className="title">Photo(s)</label>
                <PinImagesContainer images={pinHistory.photoIds} />
            </div>
        </BlockContainer>
        <div className="button-block-container size-lg-12">
            <a className="button red" href="#/">
                <i className="icon fa fa-trash" /> Delete this history
            </a>
            <a className="button" href="#/">
                Edit this history
            </a>
        </div>
    </>
);

export default PinDetails;
