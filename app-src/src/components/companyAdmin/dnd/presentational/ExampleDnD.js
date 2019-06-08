import React, { useState } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import withDropTable from '../hocs/withDropTable';
import TableBody from 'components/shared/generic/tables/presentational/TableBody';
import Item from './Item';

const initialList = [
    {
        id: 1,
        sort: 1,
        title: 'Item 1',
        text: 'Write a cool JS library'
    },
    {
        id: 2,
        sort: 2,
        title: 'Item 2',
        text: 'Make it generic enough'
    },
    {
        id: 3,
        sort: 3,
        title: 'Item 3',
        text: 'Write README'
    },
    {
        id: 4,
        sort: 4,
        title: 'Item 4',
        text: 'Create some examples'
    },
    {
        id: 5,
        sort: 5,
        title: 'Item 5',
        text: 'Spam in Twitter and IRC to promote it'
    },
    {
        id: 6,
        sort: 6,
        title: 'Item 6',
        text: '???'
    },
    {
        id: 7,
        sort: 7,
        title: 'Item 7',
        text: 'PROFIT'
    }
];

let Body = ({ items, moveItem, forwardRef }) => (
    <tbody ref={forwardRef}>
        <TableBody colCount={2}>
            {[...items]
                .sort((a, b) => a.sort - b.sort)
                .map((item, i) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        moveItem={moveItem}
                        index={i}
                    />
                ))}
        </TableBody>
    </tbody>
);

Body = withDropTable(Body);

const ExampleDnD = () => {
    const [items, setItems] = useState(initialList);

    return (
        <BlockContainer>
            <BlockHeading title="Sites" classes="w-table" />
            <table className="generic-table">
                <thead>
                    <tr>
                        {['Text', ''].map((header, i) => (
                            <th key={header + i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <Body items={items} onMove={setItems} />
            </table>
        </BlockContainer>
    );
};

export default ExampleDnD;
