import moment from 'moment';

export const dummyPrelims = {
    1: {
        id: 1,
        name: 'My Markup',
        markup: 15,
        cost: null,
    },
    2: {
        id: 2,
        name: 'My basic',
        markup: null,
        cost: 300,
    },
    3: {
        id: 3,
        name: 'Other markup',
        markup: 35,
        cost: null,
    },
    4: {
        id: 3,
        name: 'Some basic thing',
        markup: null,
        cost: 100,
    },
};

const dummyListSite = [
    {
        id: 15,
        total: 19999,
        buildings: [
            {
                id: 14,
                total: 19999,
                floors: [
                    {
                        id: 2740,
                        total: 19999,
                        drawings: [
                            {
                                id: 3226,
                                total: 19999,
                                pins: [
                                    {
                                        siteID: 1,
                                        buildingID: 1,
                                        floorID: 1,
                                        drawingID: 1,
                                        pinID: '0001:03',
                                        dateCreated: '2021-05-26 12:33:44',
                                        comment: 'Fire stop around pipe in cavity',
                                        installations: [
                                            {
                                                name: '### Installation 1 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 200,
                                            },
                                            {
                                                name: '### Installation 2 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 100,
                                            },
                                            {
                                                name: '### Installation 3 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 400,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                id: 13734,
                                total: 19999,
                                pins: [
                                    {
                                        siteID: 1,
                                        buildingID: 1,
                                        floorID: 1,
                                        drawingID: 1,
                                        pinID: '0001:03',
                                        dateCreated: '2021-05-26 12:33:44',
                                        comment: 'Fire stop around pipe in cavity',
                                        installations: [
                                            {
                                                name: '### Installation 1 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 200,
                                            },
                                            {
                                                name: '### Installation 2 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 100,
                                            },
                                            {
                                                name: '### Installation 3 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 400,
                                            },
                                        ],
                                    },
                                    {
                                        siteID: 1,
                                        buildingID: 1,
                                        floorID: 1,
                                        drawingID: 1,
                                        pinID: '0001:03',
                                        dateCreated: '2021-05-26 12:33:44',
                                        comment: 'Fire stop around pipe in cavity',
                                        installations: [
                                            {
                                                name: '### Installation 1 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 200,
                                            },
                                            {
                                                name: '### Installation 2 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 100,
                                            },
                                            {
                                                name: '### Installation 3 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 400,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 1,
                        total: 19999,
                        drawings: [
                            {
                                id: 12147,
                                total: 19999,
                                pins: [
                                    {
                                        siteID: 1,
                                        buildingID: 1,
                                        floorID: 1,
                                        drawingID: 1,
                                        pinID: '0001:03',
                                        dateCreated: '2021-05-26 12:33:44',
                                        comment: 'Fire stop around pipe in cavity',
                                        installations: [
                                            {
                                                name: '### Installation 1 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 200,
                                            },
                                            {
                                                name: '### Installation 2 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 100,
                                            },
                                            {
                                                name: '### Installation 3 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 400,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 1288,
                total: 19999,
                floors: [
                    {
                        id: 0,
                        total: 19999,
                        drawings: [
                            {
                                id: 0,
                                total: 19999,
                                pins: [
                                    {
                                        siteID: 1,
                                        buildingID: 1,
                                        floorID: 1,
                                        drawingID: 1,
                                        pinID: '0001:03',
                                        dateCreated: '2021-05-26 12:33:44',
                                        comment: 'Fire stop around pipe in cavity',
                                        installations: [
                                            {
                                                name: '### Installation 1 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 200,
                                            },
                                            {
                                                name: '### Installation 2 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 100,
                                            },
                                            {
                                                name: '### Installation 3 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 400,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 5642,
                total: 19999,
                floors: [
                    {
                        id: 0,
                        total: 19999,
                        drawings: [
                            {
                                id: 0,
                                total: 19999,
                                pins: [
                                    {
                                        siteID: 1,
                                        buildingID: 1,
                                        floorID: 1,
                                        drawingID: 1,
                                        pinID: '0001:03',
                                        dateCreated: '2021-05-26 12:33:44',
                                        comment: 'Fire stop around pipe in cavity',
                                        installations: [
                                            {
                                                name: '### Installation 1 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 200,
                                            },
                                            {
                                                name: '### Installation 2 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 100,
                                            },
                                            {
                                                name: '### Installation 3 ###',
                                                type: 'Collar',
                                                measurement: '50mm',
                                                cost: 400,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const dummyCart = {
    buildingCosts: [
        {
            buildingID: 1,
            cost: 9308.39,
            drawings: [
                {
                    drawingID: 1,
                    cost: 5000.27,
                },
                {
                    drawingID: 2,
                    cost: 4308.12,
                },
            ],
        },
        {
            buildingID: 2,
            cost: 9308.39,
            drawings: [
                {
                    drawingID: 3,
                    cost: 5000.27,
                },
                {
                    drawingID: 4,
                    cost: 4308.12,
                },
            ],
        },
    ],
    prePrelimCost: 18616.78,
    prelimIDs: [1, 2, 3, 4],
    customPrelims: [
        {
            id: 66,
            name: 'Custom markup',
            markup: 75,
            cost: null,
        },
        {
            id: 68,
            name: 'Custom basic',
            markup: 0,
            cost: 10000,
        },
    ],
    prelimTotal: 3690,
    cartTotal: 22306.78,
};

export const dummyMain = {
    keyStatistics: [
        {
            icon: 'person',
            solo: null,
            highest: {
                title: 'Highest Earning Employee',
                subtitle: 'John Doe',
                valueCurrency: null,
                valueNumerical: 1000000,
            },
            lowest: {
                title: 'Lowest Earning Employee',
                subtitle: 'John Doe',
                valueCurrency: null,
                valueNumerical: 1,
            },
        },
        {
            icon: 'building',
            solo: null,
            highest: {
                title: 'Highest Earning Building',
                subtitle: 'Building 1',
                valueCurrency: null,
                valueNumerical: 1000000,
            },
            lowest: {
                title: 'Lowest Earning Building',
                subtitle: 'Building 2',
                valueCurrency: null,
                valueNumerical: 10,
            },
        },
        {
            icon: 'pound',
            solo: {
                title: 'Avg Pin Price',
                subtitle: 'Total / 10,283 pins =',
                valueCurrency: null,
                valueNumerical: 32.94,
            },
            highest: null,
            lowest: null,
        },
        {
            icon: 'plus',
            solo: null,
            highest: {
                title: 'Most Used Installation Type',
                subtitle: 'Batt & Mastic',
                valueCurrency: null,
                valueNumerical: 204900,
            },
            lowest: {
                title: 'Least Used Installation Type',
                subtitle: 'Pipes',
                valueCurrency: null,
                valueNumerical: 2049,
            },
        },
    ],
    graph: {
        total: 18616.78,
        labels: Array(7)
            .fill(moment())
            .map((d, i) => d.subtract(i, 'days').format('MMM DD')),
        datasets: [
            {
                id: 1,
                label: '',
                data: [12000, 14000, 18616.78, 19463.78, 20490, 24490, 28490],
            },
        ],
    },
    allSites: dummyListSite,
};

export const dummyRequest = {
    hierarchyID: 1,
    hierarchyType: 1,
    selectedInstallations: [1, 2, 3, 4],
    dateFrom: null,
    dateTo: null,
    filters: {},
};

export const dummyOperatives = [
    {
        id: 1,
        name: 'John Doe',
    },
    {
        id: 2,
        name: 'Jane Doe',
    },
    {
        id: 3,
        name: 'Jack Doe',
    },
    {
        id: 4,

        name: 'Jill Doe',
    },
    {
        id: 5,
        name: 'Joe Doe',
    },
    {
        id: 6,
        name: 'Jenny Doe',
    },
    {
        id: 7,
        name: 'Juan Doe',
    },
    {
        id: 8,
        name: 'Jenny Doe',
    },
    {
        id: 9,
        name: 'Juan Doe',
    },
    {
        id: 10,
        name: 'Jenny Doe',
    },
];
