import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
const SiteStats = ({ site, stats, handleDelete, handleArchive }) => (
    <div className="stats size-lg-12">
        <div className="flex-item size-lg-12">
            <SiteDetails site={site} stats={stats} />
            <PieChart stats={stats} hierarchyType="site" />
        </div>

        <div className="button-container">
            <button className="button red" onClick={handleDelete} type="button">
                <i className="far fa-trash-alt fa-fw" /> Delete
            </button>
            <Link
                className="button yellow"
                to={`/company/sites/${site.id}/edit`}
            >
                <i className="far fa-pencil fa-fw" /> Edit
            </Link>

            <button
                className="button blue"
                onClick={handleArchive}
                type="button"
            >
                <i className="fa fa-archive" />
                {site.isArchived ? 'Un-Archive' : 'Archive'}
            </button>
            <ButtonContainer to={`/company/sites/${site.id}/change-ownership`}>
                <i className="fa fa-exchange" /> Change Ownership
            </ButtonContainer>
        </div>
    </div>
);

export default SiteStats;
