import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

const SiteStats = ({ site, stats, handleDelete, handleArchive, onMobile, handleEditSiteModal }) => (
    <div className="stats size-lg-12">
        <div className="flex-item size-lg-12">
            <SiteDetails site={site} stats={stats} />
            <PieChart
                stats={stats}
                hierarchyType="site"
                sizeClasses="size-lg-6 size-md-12"
                onMobile={onMobile}
            />
        </div>

        <div className="button-container">
            {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                <>
                    <button className="button red" onClick={handleDelete} type="button">
                        <i className="far fa-trash-alt fa-fw" /> Delete
                    </button>
                    <button className="button yellow" onClick={handleEditSiteModal}>
                        <i className="far fa-pencil fa-fw" /> Edit
                    </button>
                    <Link className="button" to={`/company/sites/${site.id}/change-ownership`}>
                        <i className="fa fa-exchange" /> Change Ownership
                    </Link>
                </>
            )}

            <button className="button blue" onClick={handleArchive} type="button">
                <i className="fa fa-archive" />
                {site.isArchived ? 'Un-Archive' : 'Archive'}
            </button>
        </div>
    </div>
);

export default SiteStats;
