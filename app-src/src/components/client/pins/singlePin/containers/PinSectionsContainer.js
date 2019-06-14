import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinSection from '../presentational/PinSection';

class PinSectionsContainer extends Component {
    render() {
        const { relevantSections, pinHistory } = this.props;

        return (
            <PinSection sections={relevantSections} pinHistory={pinHistory} />
        );
    }
}

const mapStateToProps = (
    {
        client: {
            templateSectionsReducer: { sections }
        }
    },
    ownProps
) => {
    const { templateVersionID } = ownProps.pinHistory;
    return {
        relevantSections: Object.values(sections).filter(
            section => section.templateVersionID === templateVersionID
        )
    };
};

export default connect(mapStateToProps)(PinSectionsContainer);
