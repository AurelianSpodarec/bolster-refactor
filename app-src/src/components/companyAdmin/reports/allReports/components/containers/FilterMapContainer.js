import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, TileLayer } from 'react-leaflet';

import { FILE_STORAGE_URL } from 'config';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';

class FilterMapContainer extends Component {
    render() {
        const {filters:{drawingID}}
        
        return (
            <>
                <Map>
                    <TileLayer
                        attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                        url={`${FILE_STORAGE_URL}/${
                            drawing.tilesetS3Key
                        }/{z}/{x}/{y}.jpg`}
                        noWrap={true}
                    />
                </Map>
            </>
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters }
    }
}) => {
    return {
        filters
    };
};

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterMapContainer);
