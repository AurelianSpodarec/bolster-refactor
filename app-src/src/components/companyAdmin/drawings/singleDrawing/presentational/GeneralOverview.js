import React from 'react';

import DrawingMapGeneralContainer from '../containers/DrawingMapGeneralContainer';
import DrawingDocumentsContainer from '../containers/DrawingDocumentsContainer';
import DrawingClientAccessContainer from '../containers/DrawingClientAccessContainer';
import DrawingCompaniesAccessContainer from '../containers/DrawingCompaniesAccessContainer';
import DrawingOperativesAccessContainer from '../containers/DrawingOperativesAccessContainer';

const GeneralOverview = ({ handleDelete, handleArchive, drawing }) => (
    <>
        <div className="size-lg-12">
            <div className="size-lg-12">
                <DrawingMapGeneralContainer />
            </div>
        </div>

        <div className="flex-container size-lg-12">
            <div className="flex-item small-text-table size-lg-3">
                <DrawingClientAccessContainer />
            </div>

            <div className="flex-item small-text-table size-lg-3">
                <DrawingCompaniesAccessContainer />
            </div>

            <div className="flex-item size-lg-3">
                <DrawingDocumentsContainer />
            </div>

            <div className="flex-item small-text-table size-lg-3">
                <DrawingOperativesAccessContainer />
            </div>
        </div>
        <div className="size-lg-12">
            <div className="content-container size-lg-12">
                <button
                    type="button"
                    className="button red"
                    onClick={handleDelete}
                >
                    <i className="fal fa-trash-alt" /> Delete drawing
                </button>
                <button
                    className="button"
                    onClick={handleArchive}
                    type="button"
                >
                    <i className="fa fa-archive" />
                    {drawing.isArchived ? 'Un-Archive' : 'Archive'}
                </button>
            </div>
        </div>
    </>
);

export default GeneralOverview;
