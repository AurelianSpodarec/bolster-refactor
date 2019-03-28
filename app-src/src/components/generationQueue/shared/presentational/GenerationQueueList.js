import React from 'react';
import GenerationQueueListItemContainer from '../containers/GenerationQueueListItemContainer';

const GenerationQueueList = ({ generationQueue }) =>
    generationQueue.map(queueItem => (
        <GenerationQueueListItemContainer
            key={queueItem.id}
            queueItem={queueItem}
        />
    ));

export default GenerationQueueList;
