import React from 'react';

import InvoicesTableContainer from 'components/companyAdmin/invoices/shared/invoiceListTable/containers/InvoicesTableContainer';

import Block from '../generic/block/presentational/Block';
import useAccountDeactivated from './hooks/useAccountDeactivated';
import PageHeading from '../generic/pageHeading/presentational/PageHeading';
import BlockContainer from '../generic/block/containers/BlockContainer';
import FlexWrapper from '../generic/flexWrapper/FlexWrapper';
import BolsterLogo from '../../../_content/images/bolster_logo_no_background.png';

const AccountDeactivated = () => {
    const { invoices } = useAccountDeactivated();
    return (
        <>
            <PageHeading title="Company Invoices" />

            <BlockContainer>
                <InvoicesTableContainer invoices={invoices} />
            </BlockContainer>
            <Block>
                <FlexWrapper justify="center" align="center" direction="column">
                    <p className="large-text">
                        Due to an outstanding invoice your account has been deactivated.Please
                        contact Bolster Systems.
                    </p>
                    <br />
                    <img src={BolsterLogo} alt="Bolster Logo" style={{ width: '400px' }} />
                    <FlexWrapper justify="center" align="center">
                        <p className="with-horizontal-margin large-text">
                            <br />
                            <i
                                className="fa fa-phone"
                                style={{ transform: 'rotate(90deg)', marginRight: '10px' }}
                            />
                            <a href="tel:0161 873 7679" className="link-without-decoration">
                                0161 873 7679
                            </a>
                        </p>
                        <p className="with-horizontal-margin large-text">
                            <br />
                            <i className="fa fa-envelope" style={{ marginRight: '10px' }} />
                            <a
                                href="mailto:info@bolstersystems.com"
                                className="link-without-decoration"
                            >
                                support@bolstersystems.com
                            </a>
                        </p>
                    </FlexWrapper>
                </FlexWrapper>
            </Block>
        </>
    );
};

export default AccountDeactivated;
