import React, { useEffect } from 'react';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';

import fileDownload from 'js-file-download';

import RecentlyExtendedTable from '../presentational/RecentlyExtendedTable';

import fetchRecentlyExtendedByPage from 'actions/superAdmin/recentlyExtended/async/fetchRecentlyExtendedByPage';
import updateRecentlyExtendedPage from 'actions/superAdmin/recentlyExtended/updateRecentlyExtendedPage';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

const RecentlyExtendedTableContainer = ({
    isFetching,
    error,
    recentlyExtended,
    count,
    filters,
}) => {
    const dispatch = useDispatch();
    const csvURL = `${ADMIN_API_URL}/drawings/extend/csv`;

    const PAGE_SIZE = 50;
    const { page } = filters;
    const pageCount = Math.ceil(count / PAGE_SIZE);

    useEffect(() => {
        dispatch(fetchRecentlyExtendedByPage(1));
    }, []);

    return (
        <BlockContainer>
            <BlockHeading title="Recently Extended">
                <PageSelector page={page} maxPage={pageCount} setPage={setPage} />
                <ButtonContainer handleClick={downloadCSV} className="button green">
                    <i className="fa fa-plus" /> Generate CSV
                </ButtonContainer>
            </BlockHeading>
            <RecentlyExtendedTable
                headers={[
                    'Company Name',
                    'Full Hierarchy',
                    'Previous Expiry',
                    'New Expiry Date',
                    'Reason',
                ]}
                isFetching={isFetching}
                error={error}
                recentlyExtended={recentlyExtended}
            />
        </BlockContainer>
    );

    function downloadCSV() {
        axios.get(csvURL, getHeaders()).then(res => {
            fileDownload(res.data, 'RecentlyExtendedDrawings.csv');
        });
    }

    function setPage(nextPage) {
        dispatch(updateRecentlyExtendedPage(nextPage));
        dispatch(fetchRecentlyExtendedByPage(nextPage, PAGE_SIZE));
    }
};

const mapStateToProps = ({
    superAdmin: {
        recentlyExtendedReducer: { isFetching, error, recentlyExtended, filters, count },
    },
}) => ({
    isFetching,
    error,
    recentlyExtended: Object.values(recentlyExtended),
    filters,
    count,
});

export default connect(mapStateToProps)(RecentlyExtendedTableContainer);
