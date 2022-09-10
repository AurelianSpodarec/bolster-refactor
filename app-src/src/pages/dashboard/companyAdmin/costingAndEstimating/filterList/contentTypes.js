import DateTimeContainer from 'components_DEPRECATED/shared/dateTime/containers/DateTimeContainer';
import Tickbox from 'components_DEPRECATED/shared/generic/form/presentational/Tickbox';
import { formatCurrency } from 'helpers/generic';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBuilding } from 'selectors/companyAdmin/buildings';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import { selectFloor } from 'selectors/companyAdmin/floors';
import ListItemControls from './ListItemControls';
import { selectCompanyCurrency } from '../../../../../selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS } from '../../../../../constants/companyAdmin/enums';

export const TopLevel = ({ item, isSelected, handleToggleAllItems }) => {
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    return (
        <>
            <div className="table-cell-controls">
                <div className="tickbox-cell">
                    <Tickbox name="" checked={isSelected} handleChange={handleToggleAllItems} />
                </div>
            </div>
            <div className="table-cell">
                <p>{isSelected ? 'Unselect all' : 'Select all'}</p>
            </div>
            <div className="table-cell">
                <h4>
                    {!Number.isNaN(item.total)
                        ? `${item.total < 0 ? '-' : ''}${currencySymbol}${
                              item.total > 0 ? formatCurrency(item.total, false) : '0.00'
                          }`
                        : ''}
                </h4>
            </div>
        </>
    );
};

export const Building = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const building = useSelector(state => selectBuilding(state, item.buildingID));
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${building?.name || ''}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost)
                    ? `${item.totalCost < 0 ? '-' : ''}${currencySymbol}${formatCurrency(
                          item.totalCost,
                          false,
                      )}`
                    : ''}
            </div>
        </>
    );
};
export const Floor = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const floor = useSelector(state => selectFloor(state, item.floorID));
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${floor?.name || ''}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost)
                    ? `${item.totalCost < 0 ? '-' : ''}${currencySymbol}${formatCurrency(
                          item.totalCost,
                          false,
                      )}`
                    : ''}
            </div>
        </>
    );
};
export const Drawing = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const drawing = useSelector(state => selectDrawing(state, item.drawingID));
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${drawing?.name || ''}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost)
                    ? `${item.totalCost < 0 ? '-' : ''}${currencySymbol}${formatCurrency(
                          item.totalCost,
                          false,
                      )}`
                    : ''}
            </div>
        </>
    );
};
export const History = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const { pinCode, createdOn, comment } = item;
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                handleToggleItem={handleToggleItem}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                item={item}
            />
            <div className="table-cell">{`${pinCode || ''}`}</div>
            <div className="table-cell">
                <DateTimeContainer date={createdOn} className="date" />
            </div>
            <div className="table-cell">{`${typeof comment === 'string' ? comment : ''}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.totalCost)
                    ? `${item.totalCost < 0 ? '-' : ''}${currencySymbol}${formatCurrency(
                          item.totalCost,
                          false,
                      )}`
                    : ''}
            </div>
        </>
    );
};
export const Installation = ({ item, isSelected, handleToggleItem, isExpanded, setIsExpanded }) => {
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
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
            <div className="table-cell">{`${item.name || ''}`}</div>
            <div className="table-cell">{`${item.type || ''}`}</div>
            <div className="table-cell">{`${item.measurement || ''}`}</div>
            <div className="table-cell">
                {!Number.isNaN(item.cost)
                    ? `${item.cost < 0 ? '-' : ''}${currencySymbol}${formatCurrency(
                          item.cost,
                          false,
                      )}`
                    : ''}
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
