import React from 'react';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import moment from 'moment';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { useDispatch } from 'react-redux';
import { setCompanyUserIDs } from 'actions/companyAdmin/timesheets/sync/setSelectedCompanyUserID';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const Controls = ({
    startDate,
    onPrev,
    onNext,
    onToday,
    companyUserIDs,
    companyUserOptions,
    jobReferenceIDs,
    setJobReferenceIDs,
    jobReferenceOptions,
}) => {
    const dispatch = useDispatch();

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
                            date={moment(startDate).add(6, 'days').toDate()}
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

                    <div className="end">
                        <FlexWrapper gap={10}>
                            <MultiSelect
                                options={companyUserOptions.sort((a, b) =>
                                    a.label.localeCompare(b.label),
                                )}
                                value={companyUserIDs}
                                onChange={(_, value) => dispatch(setCompanyUserIDs(value))}
                                search
                                maxSelectedVisible={4}
                                maxLines={1}
                                placeholder="-- select users --"
                                styles={selectStyles}
                            />
                            <MultiSelect
                                options={jobReferenceOptions.sort((a, b) =>
                                    a.label.localeCompare(b.label),
                                )}
                                value={jobReferenceIDs}
                                onChange={(_, value) => dispatch(setJobReferenceIDs(value))}
                                search
                                maxSelectedVisible={4}
                                maxLines={1}
                                placeholder="-- select job references --"
                                styles={selectStyles}
                            />
                        </FlexWrapper>
                    </div>
                </>
            }
        />
    );
};

const selectStyles = { width: '100%', maxWidth: '50%' };

export default Controls;
