import React from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const SaveTemplateButton = ({ saveRequired, promptMessage, handleSave }) => (
    <>
        <Prompt when={saveRequired} message={promptMessage} />
        <BlockButtonWrapper>
            <button className="button green" onClick={handleSave}>
                <i className="fa fa-save" /> Save changes
            </button>
        </BlockButtonWrapper>
    </>
);

export default withRouter(SaveTemplateButton);
