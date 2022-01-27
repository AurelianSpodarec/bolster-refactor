import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import fetchCompanyInvoices from 'actions/superAdmin/invoices/async/fetchCompanyInvoices';
import {
    selectSuperAdminInvoicesError,
    selectSuperAdminInvoicesForCompany,
    selectSuperAdminInvoicesIsFetching,
    selectSuperAdminInvoicesPaginationTotalPages,
} from 'selectors/superAdmin/invoices';

import InvoicesTable from '../presentational/InvoicesTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';

const InvoicesTableContainer = () => {
    const dispatch = useDispatch();
    const headers = ['Created', 'Total', 'Payment Type', 'Paid', ''];

    const { id } = useParams();
    const invoices = useSelector(state => selectSuperAdminInvoicesForCompany(state, id));
    const isFetching = useSelector(selectSuperAdminInvoicesIsFetching);
    const error = useSelector(selectSuperAdminInvoicesError);
    const totalPages = useSelector(selectSuperAdminInvoicesPaginationTotalPages);

    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        dispatch(fetchCompanyInvoices(id, curPage));
    }, [dispatch, curPage]);

    return (
        <BlockContainer>
            <div className="size-lg-12 size-md-12">
                <BlockHeading title="Invoices">
                    <PageSelector
                        setPage={page => setCurPage(page)}
                        page={curPage}
                        maxPage={totalPages}
                    />
                </BlockHeading>
            </div>
            <InvoicesTable
                headers={headers}
                invoices={invoices}
                isFetching={isFetching}
                error={error}
            />
        </BlockContainer>
    );
};

export default InvoicesTableContainer;
