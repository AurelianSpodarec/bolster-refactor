import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';

import { FILE_STORAGE_URL } from 'config';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import MapPin from 'components/shared/pins/map/presentational/MapPin';
import Block from 'components/shared/generic/block/presentational/Block';
import Loading from 'components/shared/generic/misc/presentational/Loading';

class FilterMapContainer extends Component {
    render() {
        const { drawing, pins, isFetching } = this.props;
        if (!drawing.id) return null;

        return (
            <Block>
                {isFetching && <Loading message="Loading pins..." />}
                <Map center={[51.505, -0.09]} zoom={1} minZoom={0} maxZoom={5}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                        url={`${FILE_STORAGE_URL}/${
                            drawing.tilesetS3Key
                        }/{z}/{x}/{y}.jpg`}
                        noWrap={true}
                    />
                    {pins.map(pin => (
                        <MapPin key={pin.id} pin={pin} />
                    ))}
                </Map>
            </Block>
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters, pinResults, isFetching },
        drawingsReducer: { drawings }
    }
}) => ({
    drawing: drawings[filters.drawingID] || {},
    pins: Object.values(pinResults).filter(({ id }) =>
        filters.pinIDs.includes(id)
    ),
    isFetching
});

const mapDispatchToProps = { updateReportFilter };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterMapContainer);
