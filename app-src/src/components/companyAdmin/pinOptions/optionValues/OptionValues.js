import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { isEmpty } from 'helpers/generic';

import setPinOptionsTypesSelectedTabID from 'actions/companyAdmin/pinOptions/sync/setPinOptionsTypesSelectedTabID';
import { selectPinOptionSet } from 'selectors/companyAdmin/pinOptionSets';

import useFetchBatchForOptionValues from './hooks/useFetchBatchForOptionValues';
import useOptionSetActions from './hooks/useOptionSetActions';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import OptionValuesList from './OptionValuesList';
import FlexHeading from 'components/shared/generic/pageHeading/presentational/FlexHeading';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const OptionValues = () => {
    const dispatch = useDispatch();
    const { isAnyEmpty, isAnyFetching, isAnyErrored, hasFetched } = useFetchBatchForOptionValues();
    const { setID } = useParams();
    const parentSet = useSelector(state => selectPinOptionSet(state, setID));
    const { showQuickEditModal, showEditSetModal } = useOptionSetActions(parentSet);

    useEffect(() => {
        if (!isEmpty(parentSet)) {
            dispatch(setPinOptionsTypesSelectedTabID(parentSet.pinOptionTypeID));
        }
    }, [parentSet]);

    const name = !isEmpty(parentSet) ? parentSet.name : 'Loading...';

    return (
        <>
            <FlexHeading title={name} withBackButton>
                <ButtonWrapper alignment="right">
                    <ActionButton
                        text="Quick Price Edit"
                        size="medium"
                        ambient="positive"
                        source="secondary"
                        onClick={showQuickEditModal}
                    />
                    <ActionMenu disabled={false}>
                        <ActionMenuActionButton
                            text="Edit"
                            onClick={showEditSetModal}
                            disabled={false}
                            tooltip={null}
                        />
                    </ActionMenu>
                </ButtonWrapper>
            </FlexHeading>

            <BlockContainer isEmpty={isAnyEmpty} isFetching={isAnyFetching} error={isAnyErrored}>
                <OptionValuesList hasFetched={hasFetched} />
            </BlockContainer>
        </>
    );
};

export default OptionValues;
