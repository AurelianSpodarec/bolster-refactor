import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
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
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import editDrawing from 'actions/companyAdmin/drawings/async/editDrawing';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';

import EditDrawingModal from '../presentational/EditDrawingModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import {
    createPreselectedItemOptionValuesList,
    formatDropdownOptions,
    getPreselectedItemTypes,
} from 'helpers/itemTypes';
import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

class EditDrawingModalContainer extends Component {
    state = {
        name: '',
        file: '',
        isCreditsAvailable: true,
        isAlertShowing: false,
        mesage: '',
        dateToSend: null,
        isManufacturingInherited: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
        areOptionsLoaded: false,
        showManufacturingOptions: true,
        manufacturingInheritedFrom: '',
        showDropdownOptions: true,
        isDropdownOptionsInherited: false,
        setDropdownOptionsForHierarchy: false,
        selectedDropdownOptions: [],
        dropdownOptions: [],
        startDate: null,
    };

    render() {
        const { drawing, filesUploading, hideModal, error } = this.props;
        const { areOptionsLoaded } = this.state;
        const drawingNotStarted = moment(Date.now()).isBefore(drawing.startDate);
        return (
            <BlockContainer
                isEmpty={!areOptionsLoaded}
                isFetching={!areOptionsLoaded}
                error={error}
                contentClass="no-padding"
            >
                <EditDrawingModal
                    {...this.state}
                    drawing={drawing}
                    handleChange={this.handleChange}
                    handleDateChange={this.handleDateChange}
                    handleStartDateChange={this.handleStartDateChange}
                    hideModal={hideModal}
                    handleSubmit={this.handleSubmit}
                    filesUploading={filesUploading}
                    handleShowManufacturingOptions={this.handleShowManufacturingOptions}
                    handleShowDropdownOptions={this.handleShowDropdownOptions}
                    drawingNotStarted={drawingNotStarted}
                />
            </BlockContainer>
        );
    }

    componentDidMount = async () => {
        const {
            drawing,
            fetchManufacturersByPinOptionType,
            fetchAllOptionValues,
            fetchAllDropdownOptions,
        } = this.props;

        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before editing a floor
        const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
            return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
        });

        const fn = function fetchManufacturers(pinOptionType) {
            return fetchManufacturersByPinOptionType(pinOptionType);
        };
        await fetchAllDropdownOptions(2);

        const actions = pinOptionTypes.map(fn);

        await Promise.all(actions).then(() => {
            fetchAllOptionValues();
        });

        this.setState({
            name: drawing.name,
            startDate: new Date(drawing.startDate),
        });
    };

    componentDidUpdate = prevProps => {
        const {
            drawing,
            postSuccess,
            error,
            showModal,
            filesUploaded,
            isFetching,
            optionValues,
            subscriptionServiceIDs,
            manufacturers,
            dropdownOptions,
        } = this.props;

        if (prevProps.isFetching && !isFetching) {
            const initialOptions = {
                isManufacturingInherited: drawing.isManufacturingInherited,
                setManufacturersForHierarchy: drawing.isManufacturingEnabled,
                manufacturerOptions: [],
                selectedManufacturerOptions: [],
                selectedOptionValues: [],
                optionValuesOptions: {},
                areOptionsLoaded: true,
                manufacturingInheritedFrom: drawing.manufacturingInheritedFrom,
            };

            const initialDropdownOptions = {
                isDropdownOptionsInherited: drawing.isDropDownOptionsInherited,
                setDropdownOptionsForHierarchy: drawing.isDropDownOptionsEnabled,
                selectedDropdownOptions: [],
                dropdownOptions: [],
                isDropDownOptionsInheritedFrom: drawing.isDropDownOptionsInheritedFrom,
            };

            initialOptions.optionValuesOptions = createOptionValuesList(
                optionValues,
                subscriptionServiceIDs,
            );
            initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);

            if (drawing.isManufacturingEnabled) {
                // prefill options from drawing already saved
                initialOptions.selectedOptionValues = drawing.optionValueIDs.map(id => String(id));

                const selected = createHierarchyPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                    optionValues,
                    initialOptions.selectedOptionValues,
                );
                initialOptions.selectedManufacturerOptions = selected;
                if (drawing.manufacturingInheritedFrom) {
                    this.setState({ showManufacturingOptions: false });
                }
            } else {
                //prefill from company settings in anticipation of isManufacturingEnabled being set to true
                initialOptions.selectedOptionValues = createPreselectedOptionValuesList(
                    initialOptions.optionValuesOptions,
                );
                initialOptions.selectedManufacturerOptions = createPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                );
            }
            //dropdown options
            initialDropdownOptions.selectedDropdownOptions = drawing.dropDownOptionIDs
                ? createPreselectedItemOptionValuesList(drawing.dropDownOptionIDs)
                : getPreselectedItemTypes(dropdownOptions);

            initialDropdownOptions.dropdownOptions = formatDropdownOptions(dropdownOptions);

            if (drawing.isDropDownOptionsInheritedFrom) {
                this.setState({ showDropdownOptions: false });
            }
            this.setState(initialOptions);
            this.setState(initialDropdownOptions);
        }

        if (!prevProps.postSuccess && postSuccess && filesUploaded) {
            showModal(SUCCESS_MODAL, {
                message:
                    'New floor plan successfully changed. It may take a few minutes before the updated floor plan is available to view, please check back later',
            });
        } else if (!prevProps.error && error) {
            showModal(ERROR_MODAL);
        } else if (!prevProps.postSuccess && postSuccess && !filesUploaded) {
            showModal(SUCCESS_MODAL, {
                message: 'Drawing name successfully changed',
            });
        }
    };

    handleChange = (name, val) => {
        const { [name]: curVal } = this.state;
        this.setState({ [name]: val === curVal ? '' : val });
    };

    handleDateChange = date => {
        this.setState({
            dateToSend: date,
        });
    };
    handleStartDateChange = date => {
        this.setState({
            startDate: date,
        });
    };
    handleShowManufacturingOptions = () => {
        this.setState({ showManufacturingOptions: true });
    };

    handleShowDropdownOptions = () => {
        this.setState({ showDropdownOptions: true });
    };

    handleSubmit = e => {
        e.preventDefault();

        const {
            name,
            file,
            isAlertShowing,
            message,
            dateToSend,
            setManufacturersForHierarchy,
            isManufacturingInherited,
            isDropdownOptionsInherited,
            setDropdownOptionsForHierarchy,
            selectedDropdownOptions,
            startDate,
        } = this.state;

        const {
            editDrawing,
            drawing,
            filesUploading,
            filesUploaded,
            totalCredits,
            addFieldError,
            showFieldErrors,
        } = this.props;

        const manufacturingEnabledOptions = isManufacturingInherited
            ? {}
            : {
                  isManufacturingEnabled: setManufacturersForHierarchy,
                  optionValueIDs: removeUnusedManufacturerDefaults(this.state),
              };

        const dropdownEnabledOptions = isDropdownOptionsInherited
            ? {}
            : {
                  isDropDownOptionsEnabled: setDropdownOptionsForHierarchy,
                  dropDownOptionIDs: selectedDropdownOptions,
              };

        let postBody = {};

        if (isAlertShowing) {
            postBody = {
                name,
                file,
                message,
                dateToSend: moment(dateToSend).format(),
                ...manufacturingEnabledOptions,
                ...dropdownEnabledOptions,
            };
        } else {
            postBody = {
                name,
                file,
                startDate: moment(startDate).format(),
                ...manufacturingEnabledOptions,
                ...dropdownEnabledOptions,
            };
        }
        const hasFileUploaded = !filesUploading && filesUploaded;
        const hasNoCredits = totalCredits < 1;
        if (
            drawing.doesRequireCreditToReplaceFloorplan &&
            !!file &&
            hasFileUploaded &&
            hasNoCredits
        ) {
            addFieldError('file', 'Not enough drawing credits');
            showFieldErrors();
        } else if (!filesUploading) editDrawing(drawing.id, postBody);
    };

    showErrorModal = () => this.props.showModal(ERROR_MODAL);
}

const mapStateToProps = ({
    companyAdmin: {
        buildingsReducer: { error: floorError, buildings },
        drawingsReducer: { drawingError, postSuccess },
        creditsReducer: { credits },
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
        },
        dropdownOptionsReducer: { dropdownOptions, isFetching: isFetchingDropdownOptions },
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
    shared: {
        filesUploadingReducer: { filesUploading, filesUploaded },
    },
}) => {
    const totalCredits = Object.values(credits).reduce((a, b) => a + b.quantity, 0);

    return {
        postSuccess,
        filesUploading,
        filesUploaded,
        totalCredits,
        isUsingBolsterLabels,
        error: drawingError || manufacturersError || optionValuesError || floorError,
        manufacturers,
        optionValues: manufacturersOptionValues,
        isFetching: isFetchingManufacturers || isFetchingOptionValues || isFetchingDropdownOptions,
        useManufacturingByDefault,
        subscriptionServiceIDs,
        building: Object.values(buildings),
        dropdownOptions: Object.values(dropdownOptions),
    };
};

const mapDispatchToProps = {
    hideModal,
    showModal,
    editDrawing,
    addFieldError,
    showFieldErrors,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    fetchAllDropdownOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDrawingModalContainer);
