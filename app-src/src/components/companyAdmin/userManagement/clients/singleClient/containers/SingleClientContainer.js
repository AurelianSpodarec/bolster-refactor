import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import fetchClientUserWithPermissions from 'actions/companyAdmin/clients/async/fetchClientUserWithPermissions';
import SingleClient from '../presentational/SingleClient';

const SingleClientContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { clientPermissions, clientUsers, isFetching, error } = useSelector(clientSelector);
    useEffect(() => {
        dispatch(fetchClientUserWithPermissions(id));
    }, [id]);

    const user = clientUsers[id];
    const permissions = Object.values(clientPermissions).filter(perm => perm.clientUserID === +id);
    const permissionsHeaders = ['Drawing', 'Services', ''];
    return (
        <SingleClient
            isFetching={isFetching}
            error={error}
            permissions={permissions}
            user={user}
            permissionsHeaders={permissionsHeaders}
        />
    );
};

const clientSelector = ({
    companyAdmin: {
        clientsReducer: { clients: clientPermissions, clientUsers, isFetching, error },
    },
}) => ({ clientPermissions, clientUsers, isFetching, error });

export default SingleClientContainer;
