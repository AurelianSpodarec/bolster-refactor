import React from 'react';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import useTypeAndStatus from '../hooks/useTypeAndStatus';

import PinTaskNoteIcon from '../../../../../../../_content/images/icons/pinTaskNote.png';

const CalendarPinTask = ({ isRecurring, actionedOn, dueOn, pinCode, viewTaskNote, id, note }) => {
    const { type, status } = useTypeAndStatus(isRecurring, actionedOn, dueOn);

    return (
        <div className="task">
            {note && (
                <ButtonContainer
                    setColour="transparent"
                    setColourHoverCode="#e6e6e6"
                    handleClick={() => viewTaskNote(id)}
                    className="smaller-padding"
                >
                    <img src={PinTaskNoteIcon} alt="Pin Task icon" />
                </ButtonContainer>
            )}
            <div className="group">
                <div className={`circle ${type}`} />
                <div className={`circle ${status}`} />
            </div>
            <div className="group">
                <p className="name">{pinCode}</p>
            </div>
        </div>
    );
};

export default CalendarPinTask;
