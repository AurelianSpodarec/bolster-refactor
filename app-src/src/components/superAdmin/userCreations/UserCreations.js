import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fileDownload from 'js-file-download';

import fetchUserCreations from 'actions/superAdmin/users/async/fetchUserCreations';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import UserCreationsTable from './UserCreationsTable';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';

const UserCreations = () => {
    const dispatch = useDispatch();
    const { users, isFetching, error, page, pageSize, totalPages } = useSelector(mapStateToProps);

    const setPage = nextPage => {
        dispatch(fetchUserCreations(nextPage, pageSize));
    };

    useEffect(() => {
        dispatch(fetchUserCreations(page, pageSize));
    }, [dispatch]);

    return (
        <>
            <PageHeading title="User Creations" withBackButton>
                <button onClick={handleDownloadCSV} className="button blue">
                    <i className="fa fa-download"></i> Download CSV
                </button>
            </PageHeading>
            <BlockContainer>
                <div className="size-lg-6 size-md-12">
                    <BlockHeading title="User Creations">
                        <PageSelector
                            setPage={setPage}
                            page={page}
                            maxPage={totalPages}
                            forceToFirstOrLast
                        />
                    </BlockHeading>
                </div>
                <UserCreationsTable users={users} isFetching={isFetching} error={error} />
            </BlockContainer>
        </>
    );

    function handleDownloadCSV() {
        fetch(`${ADMIN_API_URL}/users/creations/csv`, getHeaders()).then(res => {
            res.blob().then(blob => fileDownload(blob, 'UserCreations.csv'));
        });
    }
};

const mapStateToProps = ({
    superAdmin: {
        userCreationsReducer: {
            users,
            isFetching,
            error,
            pages: { page, totalPages, pageSize },
        },
    },
}) => ({
    users,
    isFetching,
    error,
    page,
    totalPages,
    pageSize,
});

export default UserCreations;
