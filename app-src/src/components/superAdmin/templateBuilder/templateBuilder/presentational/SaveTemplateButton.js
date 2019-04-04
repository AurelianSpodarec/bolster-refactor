import React from 'react';
import { withRouter, Prompt } from 'react-router-dom';

const SaveTemplateButton = ({ saveRequired, promptMessage, handleSave }) => (
    <>
        <Prompt when={saveRequired} message={promptMessage} />
        <button className="button" onClick={handleSave}>
            <i className="fa fa-plus" /> Save changes
        </button>
    </>
);

export default withRouter(SaveTemplateButton);
