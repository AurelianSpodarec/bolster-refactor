import React from 'react';

import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import useAddOnProrata from './hooks/useAddOnProrata';
import { formatNumber } from 'helpers/generic';

const Feature = ({ children }) => (
    <FlexWrapper extraClasses="bolster-plus-feature">
        <div className="status-icon check">
            <i className="fa fa-check fa-fw"></i>
        </div>{' '}
        <p>{children}</p>
    </FlexWrapper>
);

const BolsterPlusFeatures = ({ bolsterPlusActivated }) => {
    const { proRataCost } = useAddOnProrata();
    return (
        <>
            <p className="size-lg-12">
                Utilise the best features of Bolster Systems to improve your business workflows
            </p>
            {!bolsterPlusActivated && (
                <>
                    <p className="bolster-plus-amount size-lg-12">
                        £{formatNumber(3000)} per annum (calculated pro-rata)
                    </p>
                    <p className="size-lg-12">
                        £{formatNumber(proRataCost)} due today inline with your current service
                        subscription
                    </p>

                    <p className="heading size-lg-12">Highlights</p>
                    <div className="size-lg-12">
                        <Feature>
                            Costing &amp; Estimating (price sites automatically from your schedule
                            of rates)
                        </Feature>
                        <Feature>
                            Timesheets + (export timesheet CSVs, set wages for operatives)
                        </Feature>
                        <Feature>25 GB Document Library</Feature>
                        <Feature>Futher user managmennt control</Feature>
                        <Feature>Customised company brochure</Feature>
                        <Feature>Dedicated training call</Feature>
                    </div>
                </>
            )}
        </>
    );
};

export default BolsterPlusFeatures;
