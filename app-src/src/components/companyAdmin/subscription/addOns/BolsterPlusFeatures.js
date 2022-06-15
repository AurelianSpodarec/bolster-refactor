import React from 'react';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const Feature = ({ children }) => (
    <FlexWrapper extraClasses="bolster-plus-feature">
        <div className="status-icon check">
            <i className="fa fa-check fa-fw"></i>
        </div>{' '}
        <p>{children}</p>
    </FlexWrapper>
);

const BolsterPlusFeatures = ({ bolsterPlusActivated }) => (
    <>
        <p className="size-lg-12">
            Utilise the best features of Bolster Systems to improve your business workflows
        </p>
        {!bolsterPlusActivated && (
            <>
                <p className="bolster-plus-amount size-lg-12">£3000</p>

                <p className="heading size-lg-12">Highlights</p>
                <div className="size-lg-12">
                    <Feature>
                        Costing &amp; Estimating (price sites automatically from your schedule of
                        rates)
                    </Feature>
                    <Feature>
                        Timesheets + (export timesheet CSVs, set wages for operatives)
                    </Feature>
                    <Feature>25 GB</Feature>
                    <Feature>Futher user</Feature>
                    <Feature>Customised</Feature>
                    <Feature>Dedicated</Feature>
                </div>
            </>
        )}
    </>
);

export default BolsterPlusFeatures;
