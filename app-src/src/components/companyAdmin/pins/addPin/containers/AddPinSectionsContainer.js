import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertArrToObj } from 'helpers/generic';

import AddPinSections from '../presentational/AddPinSections';

class AddPinSectionsContainer extends Component {
    render() {
        const relevantSections = this._getSections();

        return <AddPinSections sections={relevantSections} />;
    }

    _getSections = () => {
        const { sections, selectedVersionID } = this.props;

        const relevantSections = sections
            .filter(section => section.templateVersionID === selectedVersionID)
            .map(({ id, name, sort }) => ({
                value: id,
                text: name,
                sort: sort
            }));

        return convertArrToObj(relevantSections, 'value');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        templateSectionsReducer: { sections }
    }
}) => ({
    sections: Object.values(sections)
});

export default connect(mapStateToProps)(AddPinSectionsContainer);
