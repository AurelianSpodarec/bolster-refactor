import { formatCurrency } from 'helpers/generic';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBuilding } from 'selectors/companyAdmin/buildings';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import { selectFloor } from 'selectors/companyAdmin/floors';

export const Building = ({ item }) => {
    const building = useSelector(state => selectBuilding(state, item.id));
    return (
        <>
            <div className="table-cell">{`${building?.name}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Floor = ({ item }) => {
    const floor = useSelector(state => selectFloor(state, item.id));
    return (
        <>
            <div className="table-cell">{`${floor?.name}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Drawing = ({ item }) => {
    const drawing = useSelector(state => selectDrawing(state, item.id));
    return (
        <>
            <div className="table-cell">{`${drawing?.name}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Pin = ({ item }) => {
    const { pinID, dateCreated, comment, installations } = item;
    return (
        <>
            <div className="table-cell">{`${pinID}`}</div>
            <div className="table-cell">{`${dateCreated}`}</div>
            <div className="table-cell">{`${comment}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.total)}`}</div>
        </>
    );
};
export const Installation = ({ item }) => {
    return (
        <>
            <div className="table-cell">{`${item.name}`}</div>
            <div className="table-cell">{`${item.type}`}</div>
            <div className="table-cell">{`${item.measurement}`}</div>
            <div className="table-cell">{`£${formatCurrency(item.cost)}`}</div>
        </>
    );
};
