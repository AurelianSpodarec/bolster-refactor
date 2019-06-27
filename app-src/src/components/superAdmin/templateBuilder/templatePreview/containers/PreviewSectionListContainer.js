import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PreviewSectionList from '../presentational/PreviewSectionList';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';

let PreviewSectionListContainer = ({
    sections,
    questionBySection,
    fetchTemplate,
    templateUUID
}) => {
    useEffect(() => {
        fetchTemplate(templateUUID);
    }, []);
    return (
        <PreviewSectionList
            sections={sections}
            questionBySection={questionBySection}
        />
    );
};

const mapStateToProps = (
    {
        superAdmin: {
            templateSectionsReducer: { sections },
            templateQuestionsReducer: { questions }
        }
    },
    {
        match: {
            params: { uuid }
        }
    }
) => {
    const secs = Object.values(sections)
        .filter(section => section.templateUUID === uuid)
        .sort((a, b) => a.sort - b.sort);

    const secIDs = secs.map(s => s.uuid);
    const questionBySection = Object.values(questions)
        .filter(ques => secIDs.includes(ques.sectionUUID))
        .reduce((acc, ques) => {
            acc[ques.sectionUUID] = [...acc[ques.sectionUUID], ques];

            return acc;
        }, secIDs.reduce((acc, id) => ({ ...acc, [id]: [] }), {}));
    return {
        templateUUID: uuid,
        sections: secs,
        questionBySection
    };
};

const mapDispatchToProps = { fetchTemplate };

PreviewSectionListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewSectionListContainer);
export default withRouter(PreviewSectionListContainer);
