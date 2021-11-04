import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';
import UserPermissions from '_content/images/icons/user-permission.svg';
import switchDocumentLibraryFilter from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryFilter';
import switchDocumentLibrarySearchTerm from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibrarySearchTerm';
import { usePrevious } from 'helpers/hooks';

const viewModeOptions = [
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' },
];

const filterOptions = [
    // value is allFolders, allFiles, [fileExtension], isArchived, isViewApp, isAttachPins
    { value: null, label: 'All' },
    { value: 'allFolders', label: 'Folders only' },
    { value: 'allFiles', label: 'Files only' },
    { value: 'isArchived', label: 'Deleted' },
    { value: 'isViewApp', label: 'Viewable in app' },
    { value: 'isAttachPins', label: 'Attachable to pins' },
];

const DocumentFilters = ({
    searchTerm,
    onMobile,
    viewMode,
    setViewMode,
    selectedItems,
    libraryFilter,
    deleteSuccess,
    handleShowDeleteModal = () => {},
    handleShowRestoreModal = () => {},
    showEditModal,
}) => {
    const dispatch = useDispatch();

    const prevProps = usePrevious({ deleteSuccess });

    useEffect(() => {
        if (!prevProps.deleteSuccess && deleteSuccess && libraryFilter === 'isArchived')
            dispatch(switchDocumentLibraryFilter(null));
    }, [dispatch, libraryFilter, deleteSuccess, prevProps.deleteSuccess]);

    return (
        <form className="table-search size-lg-12 flex-container document-filters">
            <Search
                value={searchTerm}
                name="searchTerm"
                placeholder="Search by file/folder name..."
                handleChange={(_, value) => dispatch(switchDocumentLibrarySearchTerm(value))}
                className="document-search"
            />
            <div style={{ display: 'flex', maxWidth: '50%' }}>
                <Select
                    name="viewMode"
                    value={viewMode}
                    options={viewModeOptions}
                    onChange={(_, value) => {
                        dispatch(setViewMode(value));
                    }}
                    placeholder="-- View mode --"
                />
                <Select
                    name="filter"
                    value={libraryFilter}
                    options={filterOptions} // View in app, Folders, file types, deleted
                    onChange={(_, value) => dispatch(switchDocumentLibraryFilter(value))}
                    placeholder="-- Filter --"
                />
                <button
                    disabled={!selectedItems.length}
                    className={`library-button button ${selectedItems.length && 'orange'}`}
                    type="button"
                    onClick={showEditModal}
                >
                    <i className="fa fa-pencil" />
                </button>
                {libraryFilter === 'isArchived' && (
                    <button
                        disabled={!selectedItems.length}
                        className={`library-button button ${selectedItems.length && 'green'}`}
                        type="button"
                        onClick={handleShowRestoreModal}
                    >
                        <i className="fa fa-undo" />
                    </button>
                )}
                <button
                    disabled={!selectedItems.length}
                    className={`library-button button ${selectedItems.length && 'blue'}`}
                    type="button"
                    onClick={() => {}}
                >
                    <i className="fa fa-cloud-download" />
                </button>
                <button
                    disabled={!selectedItems.length}
                    className={`library-button button ${selectedItems.length && 'red'}`}
                    type="button"
                    onClick={handleShowDeleteModal}
                >
                    <i className="fa fa-trash-alt" />
                </button>
            </div>
        </form>
    );
};

export default connect(
    ({
        shared: {
            mobileReducer: { onMobile },
        },
        companyAdmin: {
            documentLibraryReducer: { libraryFilter, deleteSuccess },
        },
    }) => ({
        onMobile,
        libraryFilter,
        deleteSuccess,
    }),
)(DocumentFilters);
