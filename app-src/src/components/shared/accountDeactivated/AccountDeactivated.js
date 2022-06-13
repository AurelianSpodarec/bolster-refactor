import React from 'react';

import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';
import BlockContainer from '../generic/block/containers/BlockContainer';
import Block from '../generic/block/presentational/Block';
import useAccountDeactivated from './hooks/useAccountDeactivated';

const AccountDeactivated = () => {
    const { invoices } = useAccountDeactivated();
    return (
        <>
            <BlockContainer heading="Pending Invoices">
                <InvoicesTableContainer invoices={invoices} />
            </BlockContainer>
            <Block>
                <p>
                    Due to an outstanding invoice your account has been deactivated.Please contact
                    Bolster Systems.
                </p>
            </Block>
        </>
    );
};

export default AccountDeactivated;
