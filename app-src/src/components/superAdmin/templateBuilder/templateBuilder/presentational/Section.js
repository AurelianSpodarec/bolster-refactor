import React from 'react';

import QuestionList from '../presentational/QuestionList';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const Section = ({
    isActive,
    section,
    questions,
    moveQuestion,
    deleteSection,
    showAddQuestModal,
    showRenameSectModal,
    duplicateSection,
    tooltipMessage
}) => (
    <div
        className="template-block size-lg-12"
        style={{ backgroundColor: isActive ? 'lightgreen' : '#FFF' }}
    >
        <BlockHeading title={section.name}>
            <button className="button icon-only">
                <i className="fa fa-eye" />
            </button>
            <button className="button" onClick={showRenameSectModal}>
                Rename
            </button>
        </BlockHeading>

        <QuestionList
            sectionUUID={section.uuid}
            questions={questions}
            moveQuestion={moveQuestion}
        />
        <div className="button-container position-bottom">
            <button className="button" onClick={showAddQuestModal}>
                <i className="fa fa-plus" />
                Add question
            </button>
            {tooltipMessage ? (
                <TooltipContainer text={tooltipMessage}>
                    <button className="button red disabled">
                        <i className="fa fa-times" />
                        Delete
                    </button>
                </TooltipContainer>
            ) : (
                <button className="button red" onClick={deleteSection}>
                    <i className="fa fa-times" />
                    Delete
                </button>
            )}
            <button onClick={duplicateSection} className="button">
                <i className="fa fa-clone" /> Duplicate
            </button>
        </div>
    </div>
);

export default Section;
