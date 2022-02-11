import React, { useEffect, useState } from 'react';
import { componentDidMount } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import fetchAvailableCompanies from 'actions/companyAdmin/companySelection/fetchAvailableCompanies';
import postCompanyLogin from 'actions/companyAdmin/companySelection/postCompanyLogin';
import postCompanyReset from 'actions/companyAdmin/companySelection/postCompanyReset';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import decodeJWT from 'actions/shared/jwt/async/decodeJWT';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Block from 'components/shared/generic/block/presentational/Block';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Search from 'components/shared/generic/form/presentational/Search';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { FILE_STORAGE_URL } from 'config';
import { COMPANY_USER_ROLE_IDS, COMPANY_USER_ROLE_TYPES } from 'constants/companyAdmin/enums';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

const CompanySelection = () => {
    const {
        availableCompanies,
        isFetching,
        isPosting,
        isPostingResetCompany,
        postSuccess,
        postResetCompanySuccess,
        error,
    } = useSelector(companySelector);
    const prevProps = usePrevious({
        isFetching,
        isPosting,
        isPostingResetCompany,
        postSuccess,
        postResetCompanySuccess,
        error,
    });
    const dispatch = useDispatch();
    const history = useHistory();
    componentDidMount(() => {
        // reset company
        dispatch(postCompanyReset());

        // fetch companies
        dispatch(fetchAvailableCompanies());
    });

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            onSuccess();
        }

        if (postResetCompanySuccess && !prevProps.postResetCompanySuccess) {
            onResetSuccess();
        }

        if (!isFetching && prevProps.isFetching) {
            if (!companies.length) history.push('/client/companies');
        }
        if (error && !prevProps.error) {
            dispatch(showModal(ERROR_MODAL, { message: error, title: 'attention' }));
        }
    }, [
        isFetching,
        prevProps.isFetching,
        postSuccess,
        prevProps.postSuccess,
        postResetCompanySuccess,
        prevProps.postResetCompanySuccess,
        error,
        prevProps.error,
    ]);

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

            <BlockContainer>
                <Search
                    value={searchTerm}
                    name="searchTerm"
                    placeholder="Search by company name..."
                    handleChange={handleChange}
                />
            </BlockContainer>

            <BlockContainer
                isFetching={isFetching}
                isEmpty={!companies.length}
                noDataMessage="There are no companies to choose from"
                noWhiteBackground
            >
                <div className="flex-row size-lg-12">
                    {filteredCompanies(companies).map(company => (
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
                                    className={`button green ${
                                        isPosting || isPostingResetCompany ? 'disabled' : ''
                                    }`}
                                    onClick={() => handleSelectCompany(company.companyID)}
                                >
                                    {isPosting || isPostingResetCompany
                                        ? 'Please wait...'
                                        : 'Select Company'}
                                </button>
                            </div>
                        </Block>
                    ))}
                </div>
            </BlockContainer>
        </>
    );

    async function onSuccess() {
        await dispatch(decodeJWT());
        history.push('/company');
    }

    function onResetSuccess() {
        dispatch(decodeJWT());
    }

    function handleSelectCompany(companyID) {
        dispatch(postCompanyLogin({ companyID }));
    }

    function filteredCompanies(arr) {
        const searchTermLower = searchTerm.toLowerCase();

        const selectedCompanies = arr.filter(item => {
            const company = item.companyName.toLowerCase();

            return company.includes(searchTermLower);
        });

        return selectedCompanies;
    }

    function handleChange(_, value) {
        setSearchTerm(value);
    }
};

const companySelector = ({
    companyAdmin: {
        companySelectionReducer: {
            availableCompanies,
            isFetching,
            isPosting,
            isPostingResetCompany,
            postSuccess,
            postResetCompanySuccess,
            error,
        },
    },
}) => ({
    availableCompanies,
    isFetching,
    isPosting,
    isPostingResetCompany,
    postSuccess,
    postResetCompanySuccess,
    error,
});

export default CompanySelection;
