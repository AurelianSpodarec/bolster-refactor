import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BuildingFilters from '../presentational/BuildingFilters';
import { companyAdminHierarchySort } from 'constants/shared/sortAndFilterOptions';

const BuildingFiltersContainer = () => {
    const { statusOptions } = companyAdminHierarchySort;
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(updateBuildingsFilters('name', ''));
        // dispatch(updateBuildingsFilters('status', 'active'));
    }, []);

    const handleChange = (name, value) => {
        // dispatch(updateBuildingsFilters(name, value));
    };

    return (
        <BuildingFilters
            // name={name}
            // onMobile={onMobile}
            // selectedStatus={status}
            statusOptions={Object.values(statusOptions)}
            handleChange={handleChange}
        />
    );
};

export default BuildingFiltersContainer;
