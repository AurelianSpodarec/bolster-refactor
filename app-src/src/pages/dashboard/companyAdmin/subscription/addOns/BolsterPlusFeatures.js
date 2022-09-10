import React from 'react';

import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';
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
    const { bolsterPlusProRataCost } = useAddOnProrata();
    return (
        !bolsterPlusActivated && (
            <>
                <p className="size-lg-12">
                    Utilise the best features of Bolster Systems to improve your business workflows
                </p>
                <>
                    <p className="bolster-plus-amount size-lg-12">
                        £{formatNumber(3000)} per annum (calculated pro-rata)
                    </p>
                    <p className="size-lg-12">
                        £{formatNumber(bolsterPlusProRataCost)} due today inline with your current
                        service subscription
                    </p>

                    <p className="heading size-lg-12">Highlights</p>
                    <p className="size-lg-12" style={{ marginBottom: '20px' }}>
                        'Bolster plus' is a package of new features designed to help your business
                        not only be as efficient as possible on site, but also in the office. The
                        new range of automated and scalable solutions integrates the Bolster System
                        across your whole team.
                    </p>
                    <div className="size-lg-12">
                        <Feature>
                            Costing &amp; Estimating (price sites automatically from your schedule
                            of rates)
                        </Feature>
                        <Feature>
                            Timesheets + (export timesheet CSVs, set wages for operatives)
                        </Feature>
                        <Feature>25 GB Document Library</Feature>
                        <Feature>Further user management control</Feature>
                        <Feature>Push notifications</Feature>
                        <Feature>Additional training</Feature>
                    </div>
                </>
            </>
        )
    );
};

export default BolsterPlusFeatures;
