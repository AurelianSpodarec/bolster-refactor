import React from 'react';
import { withRouter, Prompt } from 'react-router-dom';

const SaveTemplateButton = ({ saveRequired, promptMessage }) => (
    <>
        <Prompt when={saveRequired} message={promptMessage} />
        <button className="button">
            <i className="fa fa-plus" /> Save changes
        </button>
    </>
);

export default withRouter(SaveTemplateButton);
