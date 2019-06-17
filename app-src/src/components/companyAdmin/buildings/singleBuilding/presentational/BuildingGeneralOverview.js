import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BuildingDetailsContainer from '../containers/BuildingDetailsContainer';
import BuildingDocumentsTableContainer from '../containers/BuildingDocumentsTableContainer';
import BuildingFloorsTableContainer from '../containers/BuildingFloorsTableContainer';
import BuildingOperativeAddContainer from '../containers/BuildingOperativeAddContainer';
import BuildingInviteClientContainer from '../containers/BuildingInviteClientContainer';
import BuildingCompaniesAccessTableContainer from '../containers/BuildingCompaniesAccessTableContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

let BuildingGeneralOverview = ({ building }) => (
    <>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-8">
                <BuildingDetailsContainer />
            </div>

            <div className="flex-item size-lg-4">
                <BuildingDocumentsTableContainer />
            </div>
        </div>
        <div className="size-lg-12">
            <BuildingFloorsTableContainer />
        </div>

        {building.accessType >= ACCESS_TYPES_VALUES.WRITE && (
            <div className="flex-container size-lg-12">
                <div className="flex-item size-lg-4">
                    <BuildingInviteClientContainer />
                </div>

                <div className="flex-item size-lg-4">
                    <BuildingOperativeAddContainer />
                </div>

                <div className="flex-item size-lg-4">
                    <BuildingCompaniesAccessTableContainer />
                </div>
            </div>
        )}
    </>
);

const mapStateToProps = (
    { companyAdmin: { buildingsReducer } },
    { match: { params } }
) => ({ building: buildingsReducer.buildings[params['id']] || {} });

BuildingGeneralOverview = connect(mapStateToProps)(BuildingGeneralOverview);
BuildingGeneralOverview = withRouter(BuildingGeneralOverview);

export default BuildingGeneralOverview;
