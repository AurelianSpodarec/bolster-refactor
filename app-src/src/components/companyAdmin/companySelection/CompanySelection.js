import fetchAvailableCompanies from 'actions/companyAdmin/companySelection/fetchAvailableCompanies';
import postCompanyLogin from 'actions/companyAdmin/companySelection/postCompanyLogin';
import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { FILE_STORAGE_URL } from 'config';
import { FETCH_COMPANY_SETTINGS_SUCCESS } from 'constants/actionTypes/companySettings';
import { COMPANY_USER_ROLE_IDS, COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const CompanySelection = () => {
    const { availableCompanies, isFetching, isPosting, postSuccess, error } = useSelector(
        companySelector,
    );
    const prevProps = usePrevious({ isFetching, isPosting, postSuccess, error });
    const dispatch = useDispatch();
    const history = useHistory();
    componentDidMount(() => {
        // fetch companies
        dispatch(fetchAvailableCompanies());
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            onSuccess();
        }

        if (!isFetching && prevProps.isFetching) {
            if (!companies.length) history.push('/client/companies');
        }
        if (error && !prevProps.error) {
            dispatch(showModal(ERROR_MODAL, { message: error }));
        }
    }, [isFetching, isPosting, postSuccess, error]);

    async function onSuccess() {
        await dispatch(decodeJWT());
        const { payload, type } = await dispatch(fetchCompanySettings());
        await dispatch(fetchAllSubscriptions());
        if (type === FETCH_COMPANY_SETTINGS_SUCCESS) {
            if (payload.colourCode) {
                localStorage.setItem('colourCode', payload.colourCode);
            } else {
                localStorage.removeItem('colourCode');
            }
        }
        history.push('/company');
    }

    const handleSelectCompany = (companyID, type) => {
        dispatch(postCompanyLogin({ companyID, type }));
    };

    const companies = Object.values(availableCompanies).filter(
        ({ type }) => type !== COMPANY_USER_ROLE_TYPES.OPERATIVE,
    );
    return (
        <>
            <PageHeading title="Company Select">
                <div className="button-holder">
                    <p style={{ color: 'white', fontSize: '1.5em' }}>
                        Please select the company account you wish to access
                    </p>
                </div>
            </PageHeading>
            <BlockContainer
                isFetching={isFetching}
                isEmpty={!companies.length}
                noDataMessage="There are no companies to choose from"
                noWhiteBackground
            >
                <div className="flex-row size-lg-12">
                    {companies.map(company => (
                        <Block containerClass="flex-row-item size-lg-6" key={company.companyID}>
                            <BlockHeading classes="heading heading-2 underline-full half-margin">
                                {company.companyName} ({COMPANY_USER_ROLE_IDS[company.type]})
                            </BlockHeading>
                            <div className="size-lg-6">
                                <BlockHeading classes="heading heading-3 half-margin">
                                    Address
                                </BlockHeading>
                                <p className="size-lg-12">
                                    {company.addressLine1} <br />
                                    {company.addressLine2} <br />
                                    {company.town} <br />
                                    {company.postcode} <br />
                                </p>
                            </div>

                            {!!company.companyLogoFile && (
                                <div className="size-lg-6 company-logo">
                                    <img
                                        alt={`logo of ${company.companyName}`}
                                        src={`${FILE_STORAGE_URL}/${company.companyLogoFile}`}
                                    />
                                </div>
                            )}

                            <div className="button-block-container size-lg-12">
                                <button
                                    className="button green"
                                    onClick={() =>
                                        handleSelectCompany(company.companyID, company.type)
                                    }
                                >
                                    Select company
                                </button>
                            </div>
                        </Block>
                    ))}
                </div>
            </BlockContainer>
        </>
    );
};
const companySelector = ({
    companyAdmin: {
        companySelectionReducer: { availableCompanies, isFetching, isPosting, postSuccess, error },
    },
}) => ({ availableCompanies, isFetching, isPosting, postSuccess, error });

export default CompanySelection;
