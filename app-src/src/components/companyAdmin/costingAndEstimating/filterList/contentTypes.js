import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBuilding } from 'selectors/companyAdmin/buildings';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import { selectFloor } from 'selectors/companyAdmin/floors';
import ListItemControls from './ListItemControls';

export const Building = ({ item, isSelected, onChange, isExpanded, setIsExpanded }) => {
    const building = useSelector(state => selectBuilding(state, item.id));
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                onChange={onChange}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />
            <div className="table-cell">{`${building?.name}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Floor = ({ item, isSelected, onChange, isExpanded, setIsExpanded }) => {
    const floor = useSelector(state => selectFloor(state, item.id));
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                onChange={onChange}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />
            <div className="table-cell">{`${floor?.name}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Drawing = ({ item, isSelected, onChange, isExpanded, setIsExpanded }) => {
    const drawing = useSelector(state => selectDrawing(state, item.id));
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                onChange={onChange}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />
            <div className="table-cell">{`${drawing?.name}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Pin = ({ item, isSelected, onChange, isExpanded, setIsExpanded }) => {
    const { pinID, dateCreated, comment, installations } = item;
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                onChange={onChange}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />
            <div className="table-cell">{`${pinID}`}</div>
            <div className="table-cell">
                <DateTimeContainer date={dateCreated} format="DD/MM/YYYY" className="date" />
            </div>
            <div className="table-cell">{`${comment}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Installation = ({ item, isSelected, onChange, isExpanded, setIsExpanded }) => {
    return (
        <>
            <ListItemControls
                isSelected={isSelected}
                onChange={onChange}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />
            <div className="table-cell">{`${item.name}`}</div>
            <div className="table-cell">{`${item.type}`}</div>
            <div className="table-cell">{`${item.measurement}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.cost)}`}</div>
        </>
    );
};

export default {
    Building,
    Floor,
    Drawing,
    Pin,
    Installation,
};
