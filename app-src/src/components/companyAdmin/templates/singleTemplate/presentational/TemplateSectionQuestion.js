import React from 'react';
import TemplateSectionQuestionDetailsContainer from '../containers/TemplateSectionQuestionDetailsContainer';

const TemplateSectionQuestion = ({ question }) => (
    <tr key={question.id}>
        <td>{question.name}</td>
        <td>
            <TemplateSectionQuestionDetailsContainer question={question} />
        </td>
    </tr>
);

export default TemplateSectionQuestion;
