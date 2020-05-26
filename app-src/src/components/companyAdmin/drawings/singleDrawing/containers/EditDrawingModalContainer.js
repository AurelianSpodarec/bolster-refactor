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
    };

    render() {
        const { drawing, filesUploading, hideModal, error } = this.props;
        const { areOptionsLoaded } = this.state;

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
                    hideModal={hideModal}
                    handleSubmit={this.handleSubmit}
                    filesUploading={filesUploading}
                />
            </BlockContainer>
        );
    }

    componentDidMount = async () => {
        const { drawing, fetchManufacturersByPinOptionType, fetchAllOptionValues } = this.props;

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

        this.setState({
            name: drawing.name,
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
            };

            initialOptions.optionValuesOptions = createOptionValuesList(
                optionValues,
                subscriptionServiceIDs,
            );
            initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);

            if (drawing.isManufacturingEnabled) {
                // prefill options from drawing already saved
                initialOptions.selectedOptionValues = drawing.optionValueIDs.map(id => String(id));

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

        let postBody = {};

        if (isAlertShowing) {
            postBody = {
                name,
                file,
                message,
                dateToSend: moment(dateToSend).format(),
                ...manufacturingEnabledOptions,
            };
        } else {
            postBody = {
                name,
                file,
                ...manufacturingEnabledOptions,
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
        drawingsReducer: { drawingError, postSuccess },
        creditsReducer: { credits },
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
        error: drawingError || manufacturersError || optionValuesError,
        manufacturers,
        optionValues: manufacturersOptionValues,
        isFetching: isFetchingManufacturers || isFetchingOptionValues,
        useManufacturingByDefault,
        subscriptionServiceIDs,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDrawingModalContainer);
