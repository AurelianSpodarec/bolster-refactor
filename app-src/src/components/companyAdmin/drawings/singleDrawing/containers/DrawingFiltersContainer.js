import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { companyAdminHierarchySort } from 'constants/shared/sortAndFilterOptions';
import { selectIsMobile } from 'selectors/shared/mobile';
import { selectDrawingsFilterStatus } from 'selectors/shared/drawings';
import updateDrawingsFilters from '../../../../../actions/companyAdmin/drawings/sync/updateDrawingsFilter';
import DrawingFilters from '../presentational/DrawingFilters';

const DrawingFiltersContainer = () => {
    useEffect(() => {
        dispatch(updateDrawingsFilters('status', 'active'));
    }, [dispatch]);
    const dispatch = useDispatch();
    const { statusOptions } = companyAdminHierarchySort;
    const filters = useSelector(selectDrawingsFilterStatus);
    const filterStatus = filters.status;
    const onMobile = useSelector(selectIsMobile);

    const handleChange = (name, value) => {
        dispatch(updateDrawingsFilters(name, value));
    };

    return (
        <DrawingFilters
            onMobile={onMobile}
            filterStatus={filterStatus}
            statusOptions={Object.values(statusOptions)}
            handleChange={handleChange}
        />
    );
};

export default DrawingFiltersContainer;
