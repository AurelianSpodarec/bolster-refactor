import React from 'react';

import DrawingMapGeneralContainer from '../containers/DrawingMapGeneralContainer';
import DrawingDocumentsContainer from '../containers/DrawingDocumentsContainer';
import DrawingClientAccessContainer from '../containers/DrawingClientAccessContainer';
import DrawingCompaniesAccessContainer from '../containers/DrawingCompaniesAccessContainer';
import DrawingOperativesAccessContainer from '../containers/DrawingOperativesAccessContainer';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import DrawingShareLinkContainer from '../containers/DrawingShareLinkContainer';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import { ReactComponent as TrashIcon } from 'assets/images/icons/trash.svg';

const GeneralOverview = ({ handleDelete, handleArchive, drawing, drawingExpired, gotAccess }) => (
    <>
        <div className="size-lg-12">
            <div className="size-lg-12">
                <DrawingMapGeneralContainer />
            </div>
        </div>

        <div className="flex-container size-lg-12">
            {gotAccess && !drawingExpired && (
                <>
                    <div className="flex-item small-text-table size-lg-3 size-md-12">
                        <DrawingClientAccessContainer />
                    </div>

                    <div className="flex-item small-text-table size-lg-3 size-md-12">
                        <DrawingOperativesAccessContainer />
                    </div>
                    <div className="flex-item small-text-table two-line size-lg-3 size-md-12">
                        <DrawingCompaniesAccessContainer accessType={drawing?.accessType} />
                    </div>
                </>
            )}
            <div
                className={`flex-item small-text-table size-lg-${
                    gotAccess && !drawingExpired ? '3' : '12'
                } size-md-12`}
            >
                <DrawingDocumentsContainer drawingExpired={drawingExpired} />
            </div>
        </div>
        <div className="size-lg-12">
            <DrawingShareLinkContainer />
        </div>

        <div className="size-lg-12">
            <div className="content-container size-lg-12">
                <div className="button-container outside-block">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text={drawing?.isArchived ? 'Un-Archive' : 'Archive'}
                            type="button"
                            onClick={handleArchive}
                            source="secondary"
                            icon="fa fa-archive"
                        />
                        {drawing?.accessType === ACCESS_TYPES_VALUES.OWNER && (
                            <ActionButton
                                text="Delete drawing"
                                type="button"
                                onClick={handleDelete}
                                svgIconComponent={TrashIcon}
                            />
                        )}
                    </ButtonWrapper>
                </div>
            </div>
        </div>
    </>
);

export default GeneralOverview;
