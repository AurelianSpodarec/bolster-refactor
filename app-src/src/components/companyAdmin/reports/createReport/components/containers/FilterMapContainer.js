import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';

import FilterMap from '../presentational/FilterMap';

class FilterMapContainer extends Component {
    state = {
        drawRectangleMode: false,
        firstLat: null,
        firstLng: null,
        secondLat: null,
        secondLng: null
    };
    render() {
        const { drawing, pins } = this.props;
        if (!drawing.id) return null;
        return <FilterMap drawing={drawing} pins={pins} />;
    }

    handleClick = ({ latlng }) => {
        const { drawRectangleMode, firstLat, firstLng } = this.state;
        const { lat, lng } = latlng;
        if (drawRectangleMode) {
            if (!firstLat && !firstLng) {
                // draw first corner
                this.setState({ firstLat: lat, firstLng: lng });
            } else {
                // draw second corner
                this.setState({ secondLat: lat, secondLng: lng });
            }
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters, pinResults },
        drawingsReducer: { drawings }
    }
}) => ({
    drawing: drawings[filters.drawingID] || {},
    pins: Object.values(pinResults).filter(({ id }) =>
        filters.pinIDs.includes(id)
    )
});

const mapDispatchToProps = { updateReportFilter };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterMapContainer);
