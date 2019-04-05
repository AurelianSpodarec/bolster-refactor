import React from 'react';

import QuestionList from '../presentational/QuestionList';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const style = {
    width: '250px',
    height: '404px',
    border: '1px dashed gray',
    paddingLeft: '.5rem',
    paddingRight: '.5rem'
};

const headingStyle = {
    color: 'black'
};

const Section = ({
    isActive,
    section,
    questions,
    moveQuestion,
    deleteSection,
    showAddQuestModal,
    showRenameSectModal,
    duplicateSection,
    isDeleteable
}) => (
    <div
        className="template-block size-lg-12"
        style={{ ...style, backgroundColor: isActive ? 'lightgreen' : '#FFF' }}
    >
        <button className="button icon-only">
            <i className="fa fa-eye" />
        </button>
        <button className="button" onClick={showRenameSectModal}>
            Rename
        </button>
        <h3 style={{ ...headingStyle }} className="heading ">
            {section.name}
        </h3>
        <QuestionList
            sectionUUID={section.uuid}
            questions={questions}
            moveQuestion={moveQuestion}
        />
        <button className="button" onClick={showAddQuestModal}>
            <i className="fa fa-plus" />
            Add question
        </button>
        {isDeleteable ? (
            <button className="button red" onClick={deleteSection}>
                <i className="fa fa-times" />
                Delete
            </button>
        ) : (
            <TooltipContainer text="This section has prerequisites with dependants in other sections.">
                <button className="button red disabled">
                    <i className="fa fa-times" />
                    Delete
                </button>
            </TooltipContainer>
        )}
        <button onClick={duplicateSection} className="button">
            <i className="fa fa-clone" /> Duplicate
        </button>
    </div>
);

export default Section;
