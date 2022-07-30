import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertArrToObj } from 'helpers/generic';

import EditPinSections from '../presentational/EditPinSections';
import { selectTemplateSections } from '../../../../../selectors/companyAdmin/templateSections';

class EditPinSectionsContainer extends Component {
    render() {
        const relevantSections = this._getSections();

        const { selectedVersion, pinOptions, drawingID } = this.props;
        return (
            <EditPinSections
                sections={relevantSections}
                selectedVersion={selectedVersion}
                pinOptions={pinOptions}
                drawingID={drawingID}
            />
        );
    }

    _getSections = () => {
        const { sections, selectedVersionID } = this.props;

        const relevantSections = Object.values(sections)
            .filter(section => section.templateVersionID === selectedVersionID)
            .map(({ id, name, sort }) => ({
                value: id,
                text: name,
                sort: sort,
            }));

        return convertArrToObj(relevantSections, 'value');
    };
}

const mapStateToProps = state => ({
    sections: selectTemplateSections(state),
});

export default connect(mapStateToProps)(EditPinSectionsContainer);
