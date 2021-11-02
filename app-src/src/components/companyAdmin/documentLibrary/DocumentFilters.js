import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Search from 'components/shared/generic/form/presentational/Search';
import Select from 'components/shared/generic/form/presentational/Select';
import placeholder from '_content/images/examples/jamie.png';
import UserPermissions from '_content/images/icons/user-permission.svg';

const viewModeOptions = [
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' },
];

const DocumentFilters = ({
    searchTerm,
    onMobile,
    viewMode,
    setViewMode,
    selectedItems,
    handleShowSoftDeleteModal = () => {},
}) => {
    const dispatch = useDispatch();
    return (
        <form className="table-search size-lg-12 flex-container document-filters">
            <Search
                value={searchTerm}
                name="searchTerm"
                placeholder="Search by file/folder name..."
                handleChange={() => {}}
            />
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
                value={null}
                options={[]}
                onChange={() => {}}
                placeholder="Filter"
            />
            <button
                disabled={!selectedItems.length}
                className={`library-button button ${selectedItems.length && 'blue'}`}
                type="button"
                onClick={() => {}}
            >
                <img
                    src={UserPermissions}
                    alt="Delete icon"
                    title="Delete"
                    // width="24"
                    // height="24"
                />
            </button>
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
                onClick={handleShowSoftDeleteModal}
            >
                <i className="fa fa-trash-alt" />
            </button>
        </form>
    );
};

export default connect(({ shared: { mobileReducer: { onMobile } } }) => ({
    onMobile,
}))(DocumentFilters);
