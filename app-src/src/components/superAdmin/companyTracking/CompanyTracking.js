import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import fileDownload from 'js-file-download';
import moment from 'moment';

import fetchCompanyTracking from 'actions/superAdmin/companies/async/fetchCompanyTracking';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CompanyTrackingTable from './CompanyTrackingTable';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';

const CompanyTracking = () => {
    const [dates, setDates] = useState({
        dateFrom: moment('2016-01-01').toDate(),
        dateTo: moment().toDate(),
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllServices());
    }, []);

    useEffect(() => {
        dispatch(
            fetchCompanyTracking({
                dateFrom: moment(dates.dateFrom).format('YYYY-MM-DD'),
                dateTo: moment(dates.dateTo).format('YYYY-MM-DD'),
            }),
        );
    }, [dates, dispatch]);

    return (
        <>
            <PageHeading title="Company Tracking" withBackButton>
                <button onClick={handleDownloadCSV} className="button blue">
                    <i className="fa fa-download"></i> Download CSV
                </button>
            </PageHeading>
            <BlockContainer>
                <CompanyTrackingTable dates={dates} setDates={setDates} />
            </BlockContainer>
        </>
    );

    function handleDownloadCSV() {
        fetch(
            `${ADMIN_API_URL}/companies/subscriptions/csv?dateFrom=${moment(dates.dateFrom).format(
                'YYYY-MM-DD',
            )}&dateTo=${moment(dates.dateTo).format('YYYY-MM-DD')}`,
            getHeaders(),
        ).then(res => {
            res.blob().then(blob => fileDownload(blob, 'CompanyTracking.csv'));
        });
    }
};

export default CompanyTracking;
