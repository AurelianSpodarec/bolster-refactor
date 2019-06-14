import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinSection from '../presentational/PinSection';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';

class PinSectionsContainer extends Component {
    render() {
        const { relevantSections, pinHistory } = this.props;

        return (
            <PinSection sections={relevantSections} pinHistory={pinHistory} />
        );
    }

    componentDidMount = () => {
        const { fetchDrawingDropdownOptions, drawingID } = this.props;

        fetchDrawingDropdownOptions(drawingID);
    };
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

const mapDispatchToProps = dispatch => ({
    fetchDrawingDropdownOptions: drawingID => {
        dispatch(fetchDrawingDropdownOptions(drawingID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinSectionsContainer);
