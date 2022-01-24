import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';
import switchDocumentLibraryFilter from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryFilter';
import switchDocumentLibrarySearchTerm from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibrarySearchTerm';
import Form from 'components/shared/generic/form/containers/Form';

const viewModeOptions = [
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' },
];

const filterOptions = [
    // value is allFolders, allFiles, [fileExtension], isArchived, isViewApp, isAttachPins
    { value: 'all', label: 'All' },
    { value: 'allFolders', label: 'Folders only' },
    { value: 'allFiles', label: 'Files only' },
    { value: 'isArchived', label: 'Deleted' },
    { value: 'isViewApp', label: 'Viewable in app' },
    { value: 'isAttachPins', label: 'Attachable to pins' },
];

const DocumentFilters = ({
    searchTerm,
    viewMode,
    setViewMode,
    selectedItems,
    libraryFilter,
    handleShowDeleteModal = () => {},
    handleShowRestoreModal = () => {},
    showEditModal,
}) => {
    const dispatch = useDispatch();

    const isDeletedFilter = libraryFilter === 'isArchived';

    return (
        <Form
            className="table-search size-lg-12 flex-container document-filters"
            onSubmit={() => null}
        >
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
                    options={filterOptions}
                    onChange={(_, value) => dispatch(switchDocumentLibraryFilter(value))}
                    placeholder="-- Filter --"
                />
                {!isDeletedFilter && (
                    <button
                        disabled={!selectedItems.length || libraryFilter === 'isArchived'}
                        className={'library-button button'}
                        type="button"
                        onClick={showEditModal}
                    >
                        <i className="fa fa-pencil" />
                    </button>
                )}
                {isDeletedFilter && (
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
                    className={`library-button button ${selectedItems.length && 'red'}`}
                    type="button"
                    onClick={handleShowDeleteModal}
                >
                    <i className="fa fa-trash-alt" />
                </button>
            </div>
        </Form>
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
