import React, { Component } from 'react';
import { connect } from 'react-redux';

import LevelsSitesFilters from '../presentational/LevelsSitesFilters';
import { ACCESS_TYPES } from 'constants/companyAdmin/enums';
import { convertArrToObj } from 'helpers/generic';

class LevelsFilterContainer extends Component {
    state = {
        siteID: ''
    };

    render() {
        const { siteID } = this.state;

        const sitesOptions = this._formatSites();

        const selectedSite = sitesOptions.find(
            site => site.value + '' === siteID
        );

        return (
            <LevelsSitesFilters
                sitesOptions={sitesOptions}
                handleChange={this.handleChange}
                selectedSite={selectedSite}
                handleSitesChange={this._handleSitesChange}
            />
        );
    }

    _handleSitesChange = ({ target: { value, name } }) =>
        this.setState({ [name]: value });

    _formatSites = () => {
        const { sites } = this.props;

        return sites.map(({ name, id }) => ({
            value: id,
            text: name
        }));
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer
    }
}) => ({
    sites: Object.values(sitesReducer.sites),
    buildings: Object.values(buildingsReducer.buildings),
    floors: Object.values(floorsReducer.floors),
    drawings: Object.values(drawingsReducer)
});

export default connect(
    mapStateToProps,
    null
)(LevelsFilterContainer);
