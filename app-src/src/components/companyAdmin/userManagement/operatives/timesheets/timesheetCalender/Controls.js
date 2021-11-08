import React from 'react';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import moment from 'moment';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const Controls = ({ startDate, onPrev, onNext, onToday }) => {
    return (
        <BlockHeading
            headerClasses="controls"
            title={
                <>
                    <div className="nav-buttons">
                        <button onClick={onPrev}>
                            <i className="far fa-chevron-left" />
                        </button>
                        <button onClick={onNext}>
                            <i className="far fa-chevron-right" />
                        </button>
                    </div>
                    <div className="date-range">
                        <DateTimeContainer
                            date={moment(startDate).toDate()}
                            datetime={DATE_TIME_IDS.DATE}
                        />
                        -
                        <DateTimeContainer
                            date={moment(startDate).add(7, 'days').toDate()}
                            datetime={DATE_TIME_IDS.DATE}
                        />
                    </div>
                    <ButtonContainer
                        className="today-button"
                        setColour="transparent"
                        handleClick={onToday}
                    >
                        <i className="far fa-calendar-week"></i> Today
                    </ButtonContainer>
                </>
            }
        />
    );
};

export default Controls;
