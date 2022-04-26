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
                    drawingID: 1,
                    cost: 4308.12,
                },
            ],
        },
    ],
    prePrelimCost: 18616.78,
    prelimIDs: [1, 2, 3, 4],
    customPrelims: [
        {
            name: 'My Markup',
            markup: 15,
            cost: null,
        },
    ],
    prelimTotal: 3690,
    cartTotal: 22306.78,
};

export const dummyMain = {
    keyStatistics: [
        {
            icon: 'money',
            solo: null,
            highest: {
                title: 'Most Used Installation Type',
                subtitle: 'Batt & Mastic',
                valueCurrency: null,
                valueNumerical: 2049,
            },
            lowest: {},
        },
        {
            icon: 'plus',
            solo: {
                title: 'Avg Pin Price',
                subtitle: 'Total / 10,283 pins =',
                valueCurrency: 32.94,
                valueNumerical: null,
            },
            highest: null,
            lowest: null,
        },
    ],
    graph: {
        total: 18616.78,
        labels: [1650969400, 1650969400, 1650969400],
        datasets: [
            {
                id: 1,
                label: '',
                data: [12000, 14000, 18616.78],
            },
        ],
    },
    allPins: [
        {
            SsiteID: 1,
            buildingID: 1,
            floorID: 1,
            drawingID: 1,
            pinID: '0001:03',
            dateCreated: '2021-05-26 12:33:44',
            comment: 'Fire stop around pipe in cavity',
            installations: [
                {
                    name: 'Installation 1',
                    type: 'Collar',
                    measurement: '50mm',
                    cost: 200,
                },
            ],
        },
    ],
};

export const dummyRequest = {
    hierarchyID: 1,
    hierarchyType: 1,
    selectedInstallations: [1, 2, 3, 4],
    dateFrom: null,
    dateTo: null,
    filters: {},
};
