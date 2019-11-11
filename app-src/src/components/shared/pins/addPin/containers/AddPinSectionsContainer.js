import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertArrToObj } from 'helpers/generic';

import AddPinSections from '../presentational/AddPinSections';

class AddPinSectionsContainer extends Component {
    render() {
        const relevantSections = this._getSections();
        const sectionIDs = Object.values(relevantSections).map(sect => sect.id);

        const { 
            selectedVersion,
            isHistory, 
            isSameTemplate, 
            pinAnswersByGroupKey, 
            dropdownOptionsByType, 
            oldAnswersByNameObj, 
            template 
        } = this.props;
        
        return (
            <AddPinSections
                isHistory={isHistory}
                sections={relevantSections}
                sectionIDs={sectionIDs}
                selectedVersion={selectedVersion}
                isSameTemplate={isSameTemplate}
                pinAnswersByGroupKey={pinAnswersByGroupKey}
                dropdownOptionsByType={dropdownOptionsByType}
                oldAnswersByNameObj={oldAnswersByNameObj}
                template={template}
            />
        );
    }

    _getSections = () => {
        const { sections, selectedVersionID } = this.props;

        const relevantSections = sections
            .filter(section => section.templateVersionID === selectedVersionID)
            .map(({ id, name, sort }) => ({
                id,
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
