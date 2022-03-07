import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { companyAdminHierarchySort } from 'constants/shared/sortAndFilterOptions';
import { selectOnMobile } from 'selectors/shared/mobile';
import { selectFloorsFilterStatus } from 'selectors/shared/floors';
import updateFloorsFilters from '../../../../../actions/companyAdmin/floors/sync/updateFloorsFilters';
import FloorFilters from '../presentational/FloorFilters';

const FloorFiltersContainer = () => {
    useEffect(() => {
        dispatch(updateFloorsFilters('status', 'active'));
    }, [dispatch]);
    const dispatch = useDispatch();
    const { statusOptions } = companyAdminHierarchySort;
    const filters = useSelector(selectFloorsFilterStatus);
    const filterStatus = filters.status;
    const onMobile = useSelector(selectOnMobile);

    const handleChange = (name, value) => {
        dispatch(updateFloorsFilters(name, value));
    };

    return (
        <FloorFilters
            onMobile={onMobile}
            filterStatus={filterStatus}
            statusOptions={Object.values(statusOptions)}
            handleChange={handleChange}
        />
    );
};

export default FloorFiltersContainer;
