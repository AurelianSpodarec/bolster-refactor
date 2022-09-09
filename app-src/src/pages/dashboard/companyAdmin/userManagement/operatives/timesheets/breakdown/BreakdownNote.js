import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { FILE_STORAGE_URL } from 'config';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import { selectCompanyTimeZone } from 'selectors/companyAdmin/companySettings';

const BreakdownNote = ({ note, timeOut, timeIn }) => {
    const dispatch = useDispatch();
    const { comments, createdOn, imageS3Keys } = note;
    const timeZone = useSelector(selectCompanyTimeZone);

    return (
        moment(moment.utc(createdOn).tz(timeZone)).isBetween(timeIn, timeOut) && (
            <div className="breakdown-note">
                <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.TIME} />
                <p>{comments}</p>
                {imageS3Keys && (
                    <div className="image-wrapper">
                        {imageS3Keys.map((imageS3Key, i) => (
                            <img
                                key={i}
                                alt="uploaded"
                                src={`${FILE_STORAGE_URL}/${imageS3Key}?width=200`}
                                onClick={() =>
                                    dispatch(
                                        showModal(PIN_IMAGE, {
                                            image: `${FILE_STORAGE_URL}/${imageS3Key}?width=1500`,
                                        }),
                                    )
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    );
};

export default BreakdownNote;
