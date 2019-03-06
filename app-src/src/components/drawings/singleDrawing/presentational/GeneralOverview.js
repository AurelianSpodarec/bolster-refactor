import React from 'react';

const GeneralOverview = () => (
    <div className="size-lg-12">
        <div className="size-lg-8">
            <div className="content-container size-lg-12">
                <div className="content-area size-lg-12">
                    <p>Filters container</p>
                    <p>Map container</p>
                </div>
            </div>

            <div className="content-container size-lg-6">
                <div className="content-area size-lg-12">
                    <p>Clients with access container</p>
                </div>
            </div>

            <div className="content-container size-lg-6">
                <div className="content-area size-lg-12">
                    <p>Companies with access container</p>
                </div>
            </div>

            <div className="content-container size-lg-12">
                <a className="button" href="#/">
                    <i className="fal fa-trash-alt" /> Delete drawing
                </a>
            </div>
        </div>

        <div className="size-lg-4">
            <div className="content-container size-lg-12">
                <div className="content-area size-lg-12">
                    <p>Inspection log container</p>
                </div>
                <div className="content-area size-lg-12">
                    <p>Documents container</p>
                </div>
                <div className="content-area size-lg-12">
                    <p>Operatives with access container</p>
                </div>
            </div>
        </div>
    </div>
);

export default GeneralOverview;
