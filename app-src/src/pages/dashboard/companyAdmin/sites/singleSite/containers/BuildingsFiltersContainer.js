import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { companyAdminHierarchySort } from 'constants/shared/sortAndFilterOptions';
import updateBuildingsFilters from 'actions/companyAdmin/buildings/sync/updateBuildingsFilters';
import { selectBuildingFilterStatus } from 'selectors/shared/buildings';
import BuildingFilters from '../presentational/BuildingFilters';
import { selectIsMobile } from 'selectors/shared/mobile';

const BuildingFiltersContainer = () => {
    useEffect(() => {
        dispatch(updateBuildingsFilters('status', 'active'));
    }, [dispatch]);
    const dispatch = useDispatch();
    const { statusOptions } = companyAdminHierarchySort;
    const filters = useSelector(selectBuildingFilterStatus);
    const filterStatus = filters.status;
    const onMobile = useSelector(selectIsMobile);

    const handleChange = (name, value) => {
        dispatch(updateBuildingsFilters(name, value));
    };

    return (
        <BuildingFilters
            onMobile={onMobile}
            filterStatus={filterStatus}
            statusOptions={Object.values(statusOptions)}
            handleChange={handleChange}
        />
    );
};

export default BuildingFiltersContainer;
