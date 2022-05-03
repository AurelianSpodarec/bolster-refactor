import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import Tickbox from 'components/shared/generic/form/presentational/Tickbox';
import { formatCurrency } from 'helpers/generic';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBuilding } from 'selectors/companyAdmin/buildings';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import { selectFloor } from 'selectors/companyAdmin/floors';
import ListItemControls from './ListItemControls';

export const TopLevel = ({ item, isSelected, handleToggleAllItems }) => {
    return (
        <>
            <div className="table-cell-controls">
                <div>
                    <Tickbox name="" checked={isSelected} handleChange={handleToggleAllItems} />
                </div>
                <div>
                    <p>Unselect all</p>
                </div>
            </div>
            <div />
            <div className="table-cell">
                {!Number.isNaN(item.total) ? `£${formatCurrency(item.total)}` : ''}
            </div>
        </>
    );
};

export const Building = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const building = useSelector(state => selectBuilding(state, item.id));
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${building?.name}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost) ? `£${formatCurrency(item.totalCost)}` : ''}
            </div>
        </>
    );
};
export const Floor = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const floor = useSelector(state => selectFloor(state, item.id));
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${floor?.name}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost) ? `£${formatCurrency(item.totalCost)}` : ''}
            </div>
        </>
    );
};
export const Drawing = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const drawing = useSelector(state => selectDrawing(state, item.id));
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${drawing?.name}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost) ? `£${formatCurrency(item.totalCost)}` : ''}
            </div>
        </>
    );
};
export const History = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const { pinCode, dateCreated, comment } = item;
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${pinCode}`}</div>
            <div className="table-cell">
                <DateTimeContainer date={dateCreated} format="DD/MM/YYYY" className="date" />
            </div>
            <div className="table-cell">{`${comment}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost) ? `£${formatCurrency(item.totalCost)}` : ''}
            </div>
        </>
    );
};
export const Installation = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
                hideExpandButton
            />
            <div className="table-cell">{`${item.name}`}</div>
            <div className="table-cell">{`${item.type}`}</div>
            <div className="table-cell">{`${item.measurement}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.cost) ? `£${formatCurrency(item.cost)}` : ''}
            </div>
        </>
    );
};

export default {
    TopLevel,
    Building,
    Floor,
    Drawing,
    History,
    Installation,
};
