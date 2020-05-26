import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import {
    createManufacturerOptionList,
    createOptionValuesList,
    createPreselectedManufacturersList,
    createPreselectedOptionValuesList,
    createHierarchyPreselectedManufacturersList,
    removeUnusedManufacturerDefaults,
} from 'helpers/manufacturers';
import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';
import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import editFloor from 'actions/companyAdmin/floors/async/editFloor';

import EditFloorForm from '../presentational/EditFloorForm';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class EditFloorFormContainer extends Component {
    state = {
        name: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
        isManufacturingInherited: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
        areOptionsLoaded: false,
    };

    render() {
        const { isUsingBolsterLabels, error } = this.props;
        const { areOptionsLoaded } = this.state;
        return (
            <BlockContainer
                isEmpty={!areOptionsLoaded}
                isFetching={!areOptionsLoaded}
                error={error}
                contentClass="no-padding"
            >
                <EditFloorForm
                    {...this.state}
                    floorID={this.props.floorID}
                    handleInputChange={this.handleInputChange}
                    handleDateChange={this.handleDateChange}
                    handleSubmit={this.handleSubmit}
                    hideModal={this.props.hideModal}
                    isUsingBolsterLabels={isUsingBolsterLabels}
                />
            </BlockContainer>
        );
    }

    componentDidMount = async () => {
        const { floor, fetchManufacturersByPinOptionType, fetchAllOptionValues } = this.props;

        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before editing a floor
        const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
            return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
        });

        const fn = function fetchManufacturers(pinOptionType) {
            return fetchManufacturersByPinOptionType(pinOptionType);
        };

        const actions = pinOptionTypes.map(fn);

        await Promise.all(actions).then(() => {
            fetchAllOptionValues();
        });

        if (floor.id > 0) {
            this._setFormDetails();
        }
    };

    componentDidUpdate = prevProps => {
        const {
            floor,
            isFetching,
            optionValues,
            subscriptionServiceIDs,
            manufacturers,
        } = this.props;

        if (prevProps.isFetching && !isFetching) {
            const initialOptions = {
                isManufacturingInherited: floor.isManufacturingInherited,
                setManufacturersForHierarchy: floor.isManufacturingEnabled,
                manufacturerOptions: [],
                selectedManufacturerOptions: [],
                selectedOptionValues: [],
                optionValuesOptions: {},
                areOptionsLoaded: true,
            };

            initialOptions.optionValuesOptions = createOptionValuesList(
                optionValues,
                subscriptionServiceIDs,
            );
            initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);

            if (floor.isManufacturingEnabled) {
                // prefill options from floor already saved
                initialOptions.selectedOptionValues = floor.optionValueIDs.map(id => String(id));

                initialOptions.selectedManufacturerOptions = createHierarchyPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                    optionValues,
                    initialOptions.selectedOptionValues,
                );
            } else {
                //prefill from company settings in anticipation of isManufacturingEnabled being set to true
                initialOptions.selectedOptionValues = createPreselectedOptionValuesList(
                    initialOptions.optionValuesOptions,
                );
                initialOptions.selectedManufacturerOptions = createPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                );
            }

            this.setState(initialOptions);
        }

        if (!prevProps.floor.id && !!floor.id) {
            this._setFormDetails();
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleDateChange = date => {
        this.setState({
            dateToSend: date,
        });
    };

    _setFormDetails = () => {
        const {
            floor: { name },
        } = this.props;

        this.setState({
            name,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { floor, editFloor, hideModal, isAlertShowing, message, dateToSend } = this.props;

        const { name, setManufacturersForHierarchy, isManufacturingInherited } = this.state;

        const manufacturingEnabledOptions = isManufacturingInherited
            ? {}
            : {
                  isManufacturingEnabled: setManufacturersForHierarchy,
                  optionValueIDs: removeUnusedManufacturerDefaults(this.state),
              };

        let postBody = {};

        if (isAlertShowing) {
            postBody = {
                name,
                message,
                dateToSend: moment(dateToSend).format(),
                ...manufacturingEnabledOptions,
            };
        } else {
            postBody = {
                name,
                ...manufacturingEnabledOptions,
            };
        }

        editFloor(floor.id, postBody);
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        buildingsReducer: { error: floorError },
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
        },
        manufacturersReducer: {
            manufacturers,
            isFetching: isFetchingManufacturers,
            error: manufacturersError,
        },
        manufacturersOptionValuesReducer: {
            manufacturersOptionValues,
            isFetching: isFetchingOptionValues,
            error: optionValuesError,
        },
        subscriptionsReducer: {
            subscriptions: { serviceIDs: subscriptionServiceIDs },
        },
    },
}) => ({
    isUsingBolsterLabels,
    error: floorError || manufacturersError || optionValuesError,
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching: isFetchingManufacturers || isFetchingOptionValues,
    useManufacturingByDefault,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    editFloor,
    hideModal,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFloorFormContainer);
