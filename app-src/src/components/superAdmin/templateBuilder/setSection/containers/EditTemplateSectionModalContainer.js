import React, { useState } from 'react';
import { batch, useDispatch } from 'react-redux';

import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateSectionFormModal from '../presentational/TemplateSectionFormModal';

const EditTemplateSectionModalContainer = ({ section }) => {
    const [state, setState] = useState({ name: section.name, isAfterLabel: section.isAfterLabel });
    const dispatch = useDispatch();

    return (
        <TemplateSectionFormModal
            action="Edit"
            name={state.name}
            isAfterLabel={state.isAfterLabel}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            hideModal={e => {
                e.preventDefault();
                dispatch(hideModal());
            }}
        />
    );

    function handleChange(name, value) {
        setState({ ...state, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { name, isAfterLabel } = state;
        batch(() => {
            dispatch(setSection({ ...section, name, isAfterLabel }));
            dispatch(hideModal());
        });
    }
};

export default EditTemplateSectionModalContainer;
