import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import enableCompany from 'actions/superAdmin/companies/async/enableCompany';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import { selectCompaniesIsPosting } from 'selectors/superAdmin/companies';

const EnableCompanyModal = ({ company }) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectCompaniesIsPosting);
    return (
        <FlexModalOuter title={`Are you sure you want to enable ${company.name}`}>
            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton
                    text="Confirm"
                    disabled={isPosting}
                    icon={isPosting ? 'spinner' : 'check'}
                    iconSpin={isPosting}
                    type="submit"
                    onClick={() => dispatch(enableCompany(company))}
                />
            </ButtonWrapper>
        </FlexModalOuter>
    );
};

export default EnableCompanyModal;
