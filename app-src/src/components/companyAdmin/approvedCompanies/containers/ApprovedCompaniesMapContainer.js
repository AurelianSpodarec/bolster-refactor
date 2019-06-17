import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import redPin from '_content/images/map-markers/red-pin2x.png';

const Marker = ({ children }) => (
    <div className="google-maps-marker">
        <div className="holder">
            <img style={{ width: '20px' }} src={redPin} />
            <span>{children}</span>
        </div>
    </div>
);

class ApprovedCompaniesMapContainer extends Component {
    state = {
        center: { lat: 53.4808, lng: -2.244644 },
        zoom: 11
    };

    render() {
        const { center, zoom, google } = this.state;
        const { companies } = this.props;
        return (
            <BlockContainer>
                <div className="size-lg-12" style={{ height: 400 }}>
                    <GoogleMapReact
                        defaultCenter={center}
                        defaultZoom={zoom}
                        google={google}
                        bootstrapURLKeys={{
                            key: 'AIzaSyAPCib6iO1b_MTcuzMmb2wx_CyvgGfqmgo'
                        }}
                    >
                        {companies.map(company => (
                            <Marker
                                key={company.id}
                                lat={company.location.latY}
                                lng={company.location.lngX}
                            >
                                {company.name}
                            </Marker>
                        ))}
                        {/* <Marker lat={53.4808} lng={2.2426}>
                            {'Test company name'}
                        </Marker> */}
                    </GoogleMapReact>
                </div>
            </BlockContainer>
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        approvedCompaniesReducer: { approvedCompanies }
    }
}) => ({
    companies: approvedCompanies || []
});

export default connect(mapStateToProps)(ApprovedCompaniesMapContainer);
