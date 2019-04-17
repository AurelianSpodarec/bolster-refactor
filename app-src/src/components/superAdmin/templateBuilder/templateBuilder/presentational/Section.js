import React from 'react';

import QuestionList from '../presentational/QuestionList';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

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
    <div className="template-block size-lg-12">
        <BlockContainer contentClass={isActive && 'active'}>
            <BlockHeading classes="w-table" title={section.name}>
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
                    <TooltipContainer text={tooltipMessage} side="top">
                        <button className="button red disabled">
                            <i className="far fa-trash-alt" />
                            Delete
                        </button>
                    </TooltipContainer>
                ) : (
                    <button className="button red" onClick={deleteSection}>
                        <i className="far fa-trash-alt" />
                        Delete
                    </button>
                )}
                <button onClick={duplicateSection} className="button">
                    <i className="fa fa-clone" /> Duplicate
                </button>
            </div>
        </BlockContainer>
    </div>
);

export default Section;
