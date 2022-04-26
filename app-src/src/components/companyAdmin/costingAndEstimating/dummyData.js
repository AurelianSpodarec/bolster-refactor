export const dummyCart = {
    BuildingCosts: [
        {
            BuildingID: 1,
            Cost: 9308.39,
            Drawings: [
                {
                    DrawingID: 1,
                    Cost: 5000.27,
                },
                {
                    DrawingID: 1,
                    Cost: 4308.12,
                },
            ],
        },
    ],
    PrePrelimCost: 18616.78,
    PrelimIDs: [1, 2, 3, 4],
    CustomPrelims: [
        {
            Name: 'My Markup',
            Markup: 15,
            Cost: null,
        },
    ],
    PrelimTotal: 3690,
    CartTotal: 22306.78,
};

export const dummyMain = {
    KeyStatistics: [
        {
            Icon: 'money',
            Solo: null,
            Highest: {
                Title: 'Most Used Installation Type',
                Subtitle: 'Batt & Mastic',
                ValueCurrency: null,
                ValueNumerical: 2049,
            },
            Lowest: {},
        },
        {
            Icon: 'plus',
            Solo: {
                Title: 'Avg Pin Price',
                Subtitle: 'Total / 10,283 pins =',
                ValueCurrency: 32.94,
                ValueNumerical: null,
            },
            Highest: null,
            Lowest: null,
        },
    ],
    Graph: {
        Total: 18616.78,
        Labels: [1650969400, 1650969400, 1650969400],
        Datasets: [
            {
                id: 1,
                label: '',
                data: [12000, 14000, 18616.78],
            },
        ],
    },
    AllPins: [
        {
            SiteID: 1,
            BuildingID: 1,
            FloorID: 1,
            DrawingID: 1,
            PinID: '0001:03',
            DateCreated: '2021-05-26 12:33:44',
            Comment: 'Fire stop around pipe in cavity',
            Installations: [
                {
                    Name: 'Installation 1',
                    Type: 'Collar',
                    Measurement: '50mm',
                    Cost: 200,
                },
            ],
        },
    ],
};

export const dummyRequest = {
    HierarchyID: 1,
    HierarchyType: 1,
    SelectedInstallations: [1, 2, 3, 4],
    DateFrom: null,
    DateTo: null,
    Filters: {},
};
