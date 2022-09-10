import React from 'react';

import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import BreakdownNote from './BreakdownNote';

function BreakdownNotes({ notes, timeIn, timeOut }) {
    return (
        <div className="breakdown-notes">
            <BlockHeading title="Notes" />
            <div className="divider" />
            <div className="notes">
                {notes?.length > 0 ? (
                    notes.map((note, i) => (
                        <BreakdownNote
                            key={`${i}-${note.uid}`}
                            note={note}
                            timeIn={timeIn}
                            timeOut={timeOut}
                        />
                    ))
                ) : (
                    <p>No notes to show</p>
                )}
            </div>
        </div>
    );
}

export default BreakdownNotes;
