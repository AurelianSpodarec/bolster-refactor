import React from 'react';
import { useSelector } from 'react-redux';
import { selectBuilding } from 'selectors/companyAdmin/buildings';
import { selectDrawing } from 'selectors/companyAdmin/drawings';
import { selectFloor } from 'selectors/companyAdmin/floors';

export const Building = ({ item }) => {
    const building = useSelector(state => selectBuilding(state, item.id));
    return <div>{`${building?.name || '...'}`}</div>;
};
export const Floor = ({ item }) => {
    const floor = useSelector(state => selectFloor(state, item.id));
    return <div>{`${floor?.name || '...'}`}</div>;
};
export const Drawing = ({ item }) => {
    const drawing = useSelector(state => selectDrawing(state, item.id));
    return <div>{`${drawing?.name || '...'}`}</div>;
};
export const Pin = ({ item }) => {
    const { pinID, dateCreated, comment, installations } = item;
    return <div>{`${pinID} - ${comment}`}</div>;
};
export const Installation = ({ item }) => {
    return <div>{`${item?.name} - ${item.type}`}</div>;
};
