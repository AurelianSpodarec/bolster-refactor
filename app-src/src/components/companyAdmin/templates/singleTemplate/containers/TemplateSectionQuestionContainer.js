import React, { Component } from 'react';
import TemplateSectionQuestion from '../presentational/TemplateSectionQuestion';

export default class TemplateSectionQuestionContainer extends Component {
    render = () => {
        const { question } = this.props;
        // const { configuration = {} } = question;

        return <TemplateSectionQuestion question={question} />;
    };
}
