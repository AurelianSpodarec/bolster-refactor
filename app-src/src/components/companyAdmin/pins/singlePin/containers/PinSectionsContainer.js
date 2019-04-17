import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinSection from '../presentational/PinSection';

class PinSectionsContainer extends Component {
    render() {
        const { templateVersionID, templateSections, pinHistory } = this.props;

        const relevantSections = templateSections.filter(
            template => template.templateVersionID === templateVersionID
        );

        return (
            <PinSection sections={relevantSections} pinHistory={pinHistory} />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        pinHistoriesReducer: { histories, selectedHistoryId },
        templateSectionsReducer: { sections }
    }
}) => {
    const history = histories[selectedHistoryId];

    return {
        templateVersionID: history.templateVersionID,
        templateSections: Object.values(sections)
    };
};

export default connect(mapStateToProps)(PinSectionsContainer);
