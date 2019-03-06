import React from 'react';
import { Link } from 'react-router-dom';

const Building = () => (
    <div className="size-lg-12">
        <div className="content-container size-lg-8">
            <div className="content-area site-details size-lg-12">
                <h3 className="heading heading-3 size-lg-6">
                    SiteDetailsContainer
                </h3>
            </div>
        </div>

        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-3 size-lg-12">
                    DocumentsTableContainer
                </h1>
            </div>
        </div>
        <div className="content-container size-lg-12">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-1 size-lg-12">
                    FloorsTableContainer
                </h1>
                <Link className="button" to="/floors/1">
                    View Floor
                </Link>
            </div>
        </div>
        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-3 size-lg-12">
                    InviteClientContainer
                </h1>
            </div>
        </div>
        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-3 size-lg-12">
                    AddOperativeContainer
                </h1>
            </div>
        </div>
        <div className="content-container size-lg-4">
            <div className="content-area size-lg-12">
                <h1 className="heading heading-3 size-lg-12">
                    CompaniesAccessContainer
                </h1>
            </div>
        </div>
    </div>
);

export default Building;
