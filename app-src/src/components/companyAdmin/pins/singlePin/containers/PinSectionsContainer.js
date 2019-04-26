import React from 'react';
import { connect } from 'react-redux';
import PinSection from '../presentational/PinSection';

const PinSectionsContainer = ({ relevantSections, pinHistory }) => (
    <PinSection sections={relevantSections} pinHistory={pinHistory} />
);

const mapStateToProps = ({
    companyAdmin: {
        pinHistoriesReducer: { histories, selectedHistoryId },
        templateSectionsReducer: { sections }
    }
}) => {
    const history = histories[selectedHistoryId] || {};
    const { templateVersionID } = history;
    return {
        relevantSections: Object.values(sections).filter(
            section => section.templateVersionID === templateVersionID
        )
    };
};

export default connect(mapStateToProps)(PinSectionsContainer);
