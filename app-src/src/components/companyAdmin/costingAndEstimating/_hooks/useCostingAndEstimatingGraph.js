const useCostingAndEstimatingGraph = graph => {
    const width = 600;
    const height = 300;

    const data = canvas => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(
            width * 0.4,
            height * 0.2,
            width * 0.55,
            height * 1.3,
        );
        gradient.addColorStop(0, '#0047FF');
        gradient.addColorStop(1, '#00000000');

        return {
            labels: graph.labels,
            datasets: [
                {
                    backgroundColor: gradient, // Put the gradient here as a fill color
                    borderColor: '#0047FF',
                    borderWidth: 4,
                    pointRadius: 0,
                    // pointColor: '#fff',
                    // pointStrokeColor: '#ff6c23',
                    // pointHighlightFill: '#fff',
                    // pointHighlightStroke: '#ff6c23',
                    label: '',
                    data: graph.datasets[0].data,
                },
            ],
        };
    };

    const options = {
        responsive: true,
        datasetStrokeWidth: 3,
        pointDotStrokeWidth: 0,
        scaleLabel: '',
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: false,
                    },
                },
            ],
        },
        legend: {
            display: false,
        },
        tooltip: {}, // TODO
    };

    return { data, options };
};

export default useCostingAndEstimatingGraph;
