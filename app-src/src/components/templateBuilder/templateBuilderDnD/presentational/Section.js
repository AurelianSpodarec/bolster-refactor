import React from 'react';

import QuestionList from '../presentational/QuestionList';

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
    duplicateSection
}) => (
    <div
        className="template-block size-lg-12"
        style={{ ...style, backgroundColor: isActive ? 'lightgreen' : '#FFF' }}
    >
        {/* <button className="button icon-only">
            <i className="fa fa-eye" />
        </button> */}
        <button className="button" onClick={showRenameSectModal}>
            Rename
        </button>
        <h3 style={{ ...headingStyle }} className="heading ">
            {section.name}
        </h3>
        <QuestionList
            sectionUuid={section.uuid}
            questions={questions}
            moveQuestion={moveQuestion}
        />
        <button className="button" onClick={showAddQuestModal}>
            Add question
        </button>
        <button className="button" onClick={deleteSection}>
            Delete
        </button>
        <button onClick={duplicateSection} className="button">
            <i className="fa fa-clone" /> Duplicate
        </button>
    </div>
);

export default Section;
