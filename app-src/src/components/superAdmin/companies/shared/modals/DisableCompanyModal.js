import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import disableCompany from 'actions/superAdmin/companies/async/disableCompany';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import { selectCompaniesIsPosting } from 'selectors/superAdmin/companies';

const DisableCompanyModal = ({ company }) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectCompaniesIsPosting);
    return (
        <FlexModalOuter title={`Are you sure you want to disable ${company.name}`}>
            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton
                    text="Confirm"
                    disabled={isPosting}
                    icon={isPosting ? 'spinner' : 'check'}
                    iconSpin={isPosting}
                    type="submit"
                    onClick={() => dispatch(disableCompany(company))}
                />
            </ButtonWrapper>
        </FlexModalOuter>
    );
};

export default DisableCompanyModal;
