import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SectionList from '../presentational/SectionList';
import { useDrop } from 'react-dnd';
import setSections from 'actions/superAdmin/templateBuilder/sync/setSections';

const SectionListContainer = ({ sections, setSections }) => {
    const [{ hovered }, drop] = useDrop({
        accept: 'SECTION',
        collect: monitor => ({ hovered: monitor.canDrop() }),
    });

    return (
        <div ref={drop}>
            <SectionList
                sections={sections}
                findSection={findSection}
                moveSection={moveSection}
                hovered={hovered}
            />
        </div>
    );

    function findSection(secUuid) {
        const section = sections.find(sec => sec.uuid === secUuid);
        return {
            section,
            index: sections.indexOf(section),
        };
    }

    function moveSection(sectionUuid, atIndex) {
        const { section, index } = findSection(sectionUuid);
        const secs = [...sections];
        secs.splice(index, 1);
        secs.splice(atIndex, 0, section);
        const sorted = secs.map((sec, i) => ({ ...sec, sort: i + 1 }));
        setSections(sorted);
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            templateSectionsReducer: { sections },
        },
    },
    { match: { params } },
) => ({
    sections: Object.values(sections)
        .filter(section => section.templateUUID === params.uuid)
        .sort((a, b) => a.sort - b.sort),
});

const mapDispatchToProps = { setSections };

const ComponentWithConnect = connect(mapStateToProps, mapDispatchToProps)(SectionListContainer);

export default withRouter(ComponentWithConnect);
