import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import React from 'react';
import BreakdownNote from './BreakdownNote';

function BreakdownNotes({ notes }) {
    return (
        <div className="breakdown-notes">
            <BlockHeading title="Notes" />
            <div className="notes">
                {notes.length > 0 ? (
                    notes.map((note, i) => <BreakdownNote key={i} note={note} />)
                ) : (
                    <p>No notes to show</p>
                )}
            </div>
        </div>
    );
}

export default BreakdownNotes;
