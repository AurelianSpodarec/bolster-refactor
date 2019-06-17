import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { RECTANGLE_MODES } from 'constants/companyAdmin/enums';
const { ADD, DELETE, NONE, EXCLUDE } = RECTANGLE_MODES;

const PinSelectorOptions = ({ setMode, mode, handleCancel }) => (
    <BlockButtonWrapper>
        <button
            onClick={() => setMode(ADD)}
            className={`button ${mode === ADD ? 'green' : ''}`}
        >
            Add Mode
        </button>
        <button
            onClick={() => setMode(DELETE)}
            className={`button ${mode === DELETE ? 'green' : ''}`}
        >
            Delete Mode
        </button>
        <button
            onClick={() => setMode(EXCLUDE)}
            className={`button ${mode === EXCLUDE ? 'green' : ''}`}
        >
            Exclude Pin Mode
        </button>
        <button
            onClick={() => {
                setMode(NONE);
                handleCancel();
            }}
            className="button red"
        >
            Cancel
        </button>
    </BlockButtonWrapper>
);

export default PinSelectorOptions;
