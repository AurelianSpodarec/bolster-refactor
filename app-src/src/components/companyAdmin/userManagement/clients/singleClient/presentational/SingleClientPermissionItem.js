import deleteClientFromDrawing from 'actions/companyAdmin/clients/async/deleteClientFromDrawing';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_DELETE } from 'constants/shared/modalTypes';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const SingleClientPermissionItem = ({ permission, user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const services = useSelector(servicesSelector);

    return (
        <tr>
            <td>
                <Link className="link grey" to={`/company/drawings/${permission.drawingID}`}>
                    {permission.siteName} / {permission.buildingName} / {permission.floorName} /{' '}
                    {permission.drawingName}
                </Link>
            </td>
            <td>{permission.serviceIDs.map(id => services[id].name).join(', ')}</td>
            <td>
                <button className="button yellow" onClick={goToEdit}>
                    <i className="fal fa-pencil" /> Edit
                </button>
                <button className="button red" onClick={removeAccess}>
                    <i className="fal fa-ban" /> Remove access
                </button>
            </td>
        </tr>
    );

    function removeAccess() {
        const handleDelete = () => {
            dispatch(deleteClientFromDrawing(permission.id));
            dispatch(hideModal());
        };

        dispatch(
            showModal(CONFIRM_DELETE, {
                hideModal: () => dispatch(hideModal()),
                message: `Are you sure you would like to remove ${user.firstName} ${user.lastName}'s access to this drawing?`,
                handleDelete,
            }),
        );
    }

    function goToEdit() {
        history.push({
            pathname: `/company/drawings/${permission.drawingID}/edit-client/${permission.id}`,
            state: {
                isFromClientUserManagement: true,
            },
        });
    }
};
const servicesSelector = ({
    companyAdmin: {
        servicesReducer: { services },
    },
}) => services;
export default SingleClientPermissionItem;
