import React from 'react';

import { Bar } from 'react-chartjs-2';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const DashboardStats = ({ data }) => (
    <BlockContainer>
        <BlockHeading title="Pins added by operatives" />
        <Bar data={data} />
    </BlockContainer>
);

export default DashboardStats;
