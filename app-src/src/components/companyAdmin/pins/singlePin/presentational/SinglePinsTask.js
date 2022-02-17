import React from 'react';

import BlockContainer from '../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from '../../../../shared/generic/fieldOutput/presentational/FieldOutput';

const SinglePinsTask = () => {
    return (
        <>
            <BlockContainer>
                <BlockHeading classes="underline-full" title="Pin task" />

                <div className="pull-left flex-column size-lg-12">
                    <FieldOutput
                        title="Assigned to:"
                        description="Seb Smith - 007"
                        fieldClass="row"
                    />
                    <FieldOutput title="Due date:" description="17/02/2022" fieldClass="row" />
                    <FieldOutput title="Action date" description="15/02/2022" fieldClass="row" />
                </div>
            </BlockContainer>
        </>
    );
};

export default SinglePinsTask;
