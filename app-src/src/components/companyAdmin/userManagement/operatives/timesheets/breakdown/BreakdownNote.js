import showModal from 'actions/shared/generic/modals/sync/showModal';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { FILE_STORAGE_URL } from 'config';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { PIN_IMAGE } from 'constants/shared/modalTypes';
import React from 'react';
import { useDispatch } from 'react-redux';

const BreakdownNote = ({ note }) => {
    const dispatch = useDispatch();
    const { comments, createdOn, imageS3Keys } = note;

    return (
        <div className="breakdown-note">
            <DateTimeContainer date={new Date(createdOn)} datetime={DATE_TIME_IDS.TIME} />
            <p>{comments}</p>
            {imageS3Keys &&
                imageS3Keys.map((imageS3Key, i) => (
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
    );
};

export default BreakdownNote;
