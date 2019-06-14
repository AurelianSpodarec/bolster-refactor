import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ApprovedCompaniesMapContainer extends Component {
    state = {
        center: { lat: 40.744679, lng: -73.948542 },
        zoom: 11
    };

    render() {
        const { center, zoom, google } = this.state;
        return (
            <BlockContainer>
                <div className="size-lg-12" style={{ height: 400 }}>
                    <GoogleMapReact
                        defaultCenter={center}
                        defaultZoom={zoom}
                        google={google}
                        bootstrapURLKeys={{
                            key: 'AIzaSyCF1FYRZTFjmaVN9uP3vKl5z6Ub9VHVZLY'
                        }}
                    />
                </div>
            </BlockContainer>
        );
    }
}

export default ApprovedCompaniesMapContainer;
