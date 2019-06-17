import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FloorDetailsContainer from '../containers/FloorDetailsContainer';
import FloorDocumentsTableContainer from '../containers/FloorDocumentsTableContainer';
import FloorDrawingsTableContainer from '../containers/FloorDrawingsTableContainer';
import FloorOperativeAddContainer from '../containers/FloorOperativeAddContainer';
import FloorInviteClientContainer from '../containers/FloorInviteClientContainer';
import FloorCompaniesAccessTableContainer from '../containers/FloorCompaniesAccessTableContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

let FloorGeneralOverview = ({ floor }) => (
    <>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-8">
                <FloorDetailsContainer />
            </div>

            <div className="flex-item size-lg-4">
                <FloorDocumentsTableContainer />
            </div>
        </div>

        <div className="size-lg-12">
            <FloorDrawingsTableContainer />
        </div>
        {floor.accessType >= ACCESS_TYPES_VALUES.WRITE && (
            <div className="flex-container size-lg-12">
                <div className="flex-item size-lg-4">
                    <FloorInviteClientContainer />
                </div>

                <div className="flex-item size-lg-4">
                    <FloorOperativeAddContainer />
                </div>

                <div className="flex-item size-lg-4">
                    <FloorCompaniesAccessTableContainer />
                </div>
            </div>
        )}
    </>
);

const mapStateToProps = (
    { companyAdmin: { floorsReducer } },
    { match: { params } }
) => ({ floor: floorsReducer.floors[params['id']] || {} });

FloorGeneralOverview = connect(mapStateToProps)(FloorGeneralOverview);
FloorGeneralOverview = withRouter(FloorGeneralOverview);

export default FloorGeneralOverview;
