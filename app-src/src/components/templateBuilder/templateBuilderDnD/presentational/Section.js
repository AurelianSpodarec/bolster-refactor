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

const Section = ({ isActive, section, questions, moveQuestion }) => (
    <div
        style={{ ...style, backgroundColor: isActive ? 'lightgreen' : '#FFF' }}
    >
        <h3 style={{ ...headingStyle }} className="heading ">
            {section.name}
        </h3>
        <QuestionList
            sectionUuid={section.uuid}
            questions={questions}
            moveQuestion={moveQuestion}
        />
    </div>
);

export default Section;
