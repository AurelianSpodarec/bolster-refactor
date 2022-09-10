import React from 'react';
import { useSelector } from 'react-redux';

import { isEmpty } from 'helpers/generic';

import {
    selectSubscriptions,
    selectSubscriptionsIsFetching,
} from 'selectors/companyAdmin/subscriptions';

import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BolsterPlusPodInner from './BolsterPlusPodInner';

const BolsterPlusPod = () => {
    const subscriptions = useSelector(selectSubscriptions);
    const isFetching = useSelector(selectSubscriptionsIsFetching);

    return (
        <BlockContainer isFetching={isFetching} isEmpty={isEmpty(subscriptions)}>
            <BolsterPlusPodInner />
        </BlockContainer>
    );
};

export default BolsterPlusPod;
