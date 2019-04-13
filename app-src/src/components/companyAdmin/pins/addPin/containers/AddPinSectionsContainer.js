import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddPinSections from '../presentational/AddPinSections';

class AddPinSectionsContainer extends Component {
    render() {
        console.log(this.props.selectedVersionID);

        return <AddPinSections />;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        templateSectionsReducer: { sections }
    }
}) => ({
    sections: Object.values(sections)
});

export default connect(mapStateToProps)(AddPinSectionsContainer);
