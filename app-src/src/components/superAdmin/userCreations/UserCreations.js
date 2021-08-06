import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fileDownload from 'js-file-download';

import fetchUserCreations from 'actions/superAdmin/users/async/fetchUserCreations';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import UserCreationsTable from './UserCreationsTable';

const UserCreations = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserCreations());
    }, [dispatch]);

    return (
        <>
            <PageHeading title="User Creations" withBackButton>
                <button onClick={handleDownloadCSV} className="button blue">
                    <i className="fa fa-download"></i> Download CSV
                </button>
            </PageHeading>
            <BlockContainer>
                <UserCreationsTable />
            </BlockContainer>
        </>
    );

    function handleDownloadCSV() {
        fetch(`${ADMIN_API_URL}/users/creations/csv`, getHeaders()).then(res => {
            res.blob().then(blob => fileDownload(blob, 'UserCreations.csv'));
        });
    }
};

export default UserCreations;
