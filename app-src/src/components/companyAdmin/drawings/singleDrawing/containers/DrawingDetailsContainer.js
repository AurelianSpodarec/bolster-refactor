import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { momentComparisonFormat } from 'helpers/generic';
import { FURTHER_FILTRATION_OPTIONS } from 'constants/companyAdmin/enums';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DrawingStats from '../presentational/DrawingStats';
import withUpdateOnChange from 'components/client/reports/createReport/components/hocs/withUpdateOnChange';

class DrawingDetailsContainer extends Component {
    render() {
        const { drawing, stats, error, isFetching, onMobile } = this.props;
        console.error(this._getFilteredPins());

        return (
            <BlockContainer
                error={error}
                isFetching={isFetching}
                isEmpty={!drawing.id || !stats.statuses}
            >
                <DrawingStats drawing={drawing} stats={stats} onMobile={onMobile} />
            </BlockContainer>
        );
    }

    _getFilteredPins = () => {
        const { pins, filters, furtherFiltrationOption } = this.props;
        // ? Displays all pins if in rectangle mode, and only the selected pins otherwise.

        const {
            fromDateInclusive,
            toDateInclusive,
            status,
            serviceID,
            templateID,
            companyUserIDs
        } = filters;
        const NO = false;
        // simple
        return furtherFiltrationOption <= FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS
            ? pins.filter(pin => {
                  // start date
                  if (
                      fromDateInclusive &&
                      moment(pin.createdOn) < moment(fromDateInclusive, momentComparisonFormat)
                  ) {
                      return NO;
                  }
                  // end date
                  if (
                      toDateInclusive &&
                      moment(pin.createdOn) > moment(toDateInclusive, momentComparisonFormat)
                  ) {
                      return NO;
                  }
                  // status
                  if (status && +pin.latestStatus !== +status) {
                      return NO;
                  }
                  // services
                  if (serviceID && +pin.latestServiceID !== +serviceID) {
                      return NO;
                  }
                  // templates
                  if (templateID && +templateID !== pin.templateID) {
                      return NO;
                  }
                  // operatives
                  if (
                      companyUserIDs &&
                      companyUserIDs.length &&
                      !companyUserIDs.includes(pin.latestCreatedByCompanyUserID)
                  ) {
                      return NO;
                  }
                  if (+furtherFiltrationOption === FURTHER_FILTRATION_OPTIONS.INDIVIDUAL_PINS) {
                      if (!filters.pinIDs.includes(pin.id)) {
                          return NO;
                      }
                  }
                  return true;
              })
            : // advanced
              pins.filter(({ id }) => filters.pinIDs.includes(id));
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { drawings, isFetching: fetchingDrawings, error: drawingsError },
            statsReducer: { stats, isFetching: fetchingStats, error: statsError },
            reportsReducer: {
                filters: { pinIDs, companyUserIDs },
                customFilters: { pins: pinsFromAPI },
                furtherFiltrationOption,
                isFetching: isFetchingReports
            },
            pinsReducer: { pins, isFetching: fetchingPins, error }
        },
        shared: {
            mobileReducer: { onMobile }
        }
    },
    { match }
) => ({
    drawing: drawings[match.params.id] || {},
    isFetching: fetchingDrawings || fetchingStats,
    error: drawingsError || statsError,
    stats,
    onMobile,
    id: match.params.id,
    pins: Object.values(pins),
    // operatives: Object.values(users),
    fetchingPins: fetchingPins,
    isFetchingReports,
    pinsError: error,
    pinIDs,
    pinsFromAPI,
    furtherFiltrationOption,
    companyUserIDs
});

export default withUpdateOnChange(withRouter(connect(mapStateToProps)(DrawingDetailsContainer)));
