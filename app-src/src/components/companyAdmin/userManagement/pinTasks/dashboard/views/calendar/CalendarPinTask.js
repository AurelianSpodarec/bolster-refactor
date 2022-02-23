import React from 'react';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import useTypeAndStatus from '../hooks/useTypeAndStatus';

import PinTaskNoteIcon from '../../../../../../../_content/images/icons/pinTaskNote.png';

const CalendarPinTask = ({
    isRecurring,
    actionedOn,
    dueOn,
    pinCode,
    viewTaskNote,
    id,
    note,
    pinID,
}) => {
    const { type, status } = useTypeAndStatus(isRecurring, actionedOn, dueOn);

    return (
        <a href={`/company/pins/${pinID}`} className="task link-without-decoration">
            <div className="group">
                <div className={`circle ${type}`} />
                <div className={`circle ${status}`} />
                {note && (
                    <ButtonContainer
                        setColour="transparent"
                        setColourHoverCode="#e6e6e6"
                        handleClick={e => {
                            e.preventDefault();
                            viewTaskNote(id);
                        }}
                        className="no-padding"
                    >
                        <img src={PinTaskNoteIcon} alt="Pin Task icon" />
                    </ButtonContainer>
                )}
            </div>
            <div className="group">
                <p className="name">{pinCode}</p>
            </div>
        </a>
    );
};

export default CalendarPinTask;
