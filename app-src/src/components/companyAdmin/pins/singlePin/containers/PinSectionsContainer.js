import React from 'react';
import { useSelector } from 'react-redux';
import PinSection from '../presentational/PinSection';
import { selectTemplateSections } from '../../../../../selectors/companyAdmin/templateSections';

const PinSectionsContainer = ({ pinHistory }) => {
    const sections = useSelector(selectTemplateSections);

    const relevantSections = Object.values(sections)
        .filter(({ templateVersionID }) => templateVersionID === pinHistory.templateVersionID)
        .sort((a, b) => a.sort - b.sort);

    return <PinSection sections={relevantSections} pinHistory={pinHistory} />;
};

export default PinSectionsContainer;
