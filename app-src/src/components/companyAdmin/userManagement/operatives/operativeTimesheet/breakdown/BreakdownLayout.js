import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';

const BreakdownLayout = ({ children, selectedDate }) => {
    return (
        <BlockContainer>
            <BlockHeading
                title={
                    <DateTimeContainer
                        date={new Date(selectedDate)}
                        datetime={DATE_TIME_IDS.DATE}
                    />
                }
            />
            {children}
        </BlockContainer>
    );
};

export default BreakdownLayout;
