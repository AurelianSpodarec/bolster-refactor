import React from 'react';
import GenerationQueueListItem from '../presentational/GenerationQueueListItem';

const GenerationQueueListItemContainer = ({ queueItem }) => (
    <GenerationQueueListItem queueItem={queueItem} />
);

export default GenerationQueueListItemContainer;
