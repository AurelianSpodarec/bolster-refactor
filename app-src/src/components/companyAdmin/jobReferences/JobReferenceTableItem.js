import React from 'react';
import { useDispatch } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { DELETE_JOB_REFERENCE, EDIT_JOB_REFERENCE } from 'constants/shared/modalTypes';

const JobReferenceTableItem = ({ jobReference }) => {
    const dispatch = useDispatch();

    return (
        <tr>
            <td>{jobReference.name}</td>
            <td>{jobReference.description}</td>
            <td>
                <button
                    className="button yellow"
                    onClick={() => dispatch(showModal(EDIT_JOB_REFERENCE, { jobReference }))}
                >
                    <i className="far fa-pencil" />
                    Edit
                </button>

                <button
                    className="button red"
                    onClick={() =>
                        dispatch(showModal(DELETE_JOB_REFERENCE, { id: jobReference.id }))
                    }
                >
                    <i className="far fa-times" />
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default JobReferenceTableItem;
