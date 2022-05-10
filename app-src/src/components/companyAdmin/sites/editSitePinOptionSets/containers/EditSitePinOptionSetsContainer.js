import React, { useEffect, useState } from 'react';
import { usePrevious } from '../../../../../helpers/hooks';
import BlockContainer from '../../../../shared/generic/block/containers/BlockContainer';
import EditSitePinOptionSets from '../presentational/EditSitePinOptionSets';
import { batch, useDispatch, useSelector } from 'react-redux';
import { componentDidMount } from '../../../../../helpers/generic';
import fetchPinOptionTypes from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';
import fetchPinOptionSets from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionSets';
import {
    selectPinOptionTypes,
    selectPinOptionTypesIsFetching,
} from '../../../../../selectors/companyAdmin/pinOptionTypes';
import {
    selectPinOptionSets,
    selectPinOptionSetsIsFetching,
} from '../../../../../selectors/companyAdmin/pinOptionSets';
import { hideModal } from '../../../../../actions/shared/generic/modals/sync/hideModal';
import editSitePinOptionSets from '../../../../../actions/companyAdmin/sites/async/editSitePinOptionSets';
import { selectSubscriptions } from '../../../../../selectors/superAdmin/companySubscription';

const EditSitePinOptionSetsContainer = ({ site }) => {
    const [selectedPinOptionTypes, setSelectedPinOptionTypes] = useState({});
    const [selectedPinOptionSets, setSelectedPinOptionSets] = useState({});

    const types = useSelector(selectPinOptionTypes);
    const sets = useSelector(selectPinOptionSets);
    const isFetchingSets = useSelector(selectPinOptionSetsIsFetching);
    const isFetchingTypes = useSelector(selectPinOptionTypesIsFetching);
    const isFetching = isFetchingSets || isFetchingTypes;
    const prevProps = usePrevious({ isFetching, selectedPinOptionTypes });
    const { serviceIDs } = useSelector(selectSubscriptions);

    const dispatch = useDispatch();
    componentDidMount(() => {
        batch(() => {
            dispatch(fetchPinOptionTypes());
            dispatch(fetchPinOptionSets());
        });
    });
    useEffect(() => {
        if (!isFetching && prevProps.isFetching) {
            const selectedTypes = {};
            Object.values(sets).forEach(set => {
                if (site.pinOptionSetIDsByType[set.pinOptionTypeID]?.length) {
                    selectedTypes[set.pinOptionTypeID] = true;
                }
            });

            setSelectedPinOptionSets(site.pinOptionSetIDsByType);
            setSelectedPinOptionTypes(selectedTypes);
        }
    }, [types, sets, isFetching]);

    useEffect(() => {
        Object.keys(selectedPinOptionTypes).forEach(typeID => {
            if (selectedPinOptionTypes[typeID] && !prevProps.selectedPinOptionTypes[typeID]) {
                const hasExistingSets = site.pinOptionSetIDsByType[typeID]?.length;
                if (!hasExistingSets) {
                    const defaultSetIDs = Object.values(sets)
                        .filter(set => set.pinOptionTypeID === +typeID && set.isDefault)
                        .map(set => set.id);
                    setSelectedPinOptionSets({ ...selectedPinOptionSets, [typeID]: defaultSetIDs });
                }
            }
        });
    }, [selectedPinOptionTypes, sets]);

    const handleSubmit = () => {
        const pinOptionSets = Object.entries(selectedPinOptionSets)
            .filter(([, value]) => value.length > 0)
            .map(([key, value]) => ({ pinOptionTypeID: key, pinOptionSetIDs: value }));
        const postBody = { pinOptionSets };
        dispatch(editSitePinOptionSets(site.id, postBody));
        dispatch(hideModal());
    };

    const handlePinOptionTypeChange = (type, value) => {
        setSelectedPinOptionTypes({ ...selectedPinOptionTypes, [type]: value });
        if (!value) {
            setSelectedPinOptionSets({ ...selectedPinOptionSets, [type]: [] });
        }
    };
    const handlePinOptionSetChange = (type, value) => {
        setSelectedPinOptionSets({ ...selectedPinOptionSets, [type]: value });
    };

    const typesToDisplay = Object.values(types).filter(type => type.hasSiteLinks);
    const typeIDs = typesToDisplay.map(type => type.id);
    const typeSets = Object.values(sets)
        .filter(set => typeIDs.includes(set.pinOptionTypeID))
        .reduce((acc, set) => {
            // only services company has access to
            if (set.serviceIDs && !set.serviceIDs.some(id => serviceIDs.includes(id))) {
                return acc;
            }
            if (selectedPinOptionSets[set.pinOptionTypeID]?.includes(set.ID) || !set.isDisabled) {
                acc[set.pinOptionTypeID] = (acc[set.pinOptionTypeID] || []).concat(set);
            }
            return acc;
        }, {});
    return (
        <BlockContainer isFetching={isFetching}>
            <EditSitePinOptionSets
                isFetching={isFetching}
                handlePinOptionTypeChange={handlePinOptionTypeChange}
                handlePinOptionSetChange={handlePinOptionSetChange}
                handleSubmit={handleSubmit}
                types={typesToDisplay}
                typeSets={typeSets}
                selectedPinOptionTypes={selectedPinOptionTypes}
                selectedPinOptionSets={selectedPinOptionSets}
                hideModal={() => dispatch(hideModal())}
            />
        </BlockContainer>
    );
};

export default EditSitePinOptionSetsContainer;
