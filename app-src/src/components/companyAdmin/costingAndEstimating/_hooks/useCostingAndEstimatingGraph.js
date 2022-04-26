const useCostingAndEstimatingGraph = graph => {
    // TODO - hide numbers & grid lines, implement hover states on tooltips
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
            // labels: [
            //     '02:00',
            //     '04:00',
            //     '06:00',
            //     '08:00',
            //     '10:00',
            //     '12:00',
            //     '14:00',
            //     '16:00',
            //     '18:00',
            //     '20:00',
            //     '22:00',
            //     '00:00',
            // ],
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
                    // data: [25.0, 32.4, 22.2, 39.4, 34.2, 22.0, 23.2, 20, 20.0, 30, 19.1, 17.4],
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
        // scaleLabel: "<%= Number(value).toFixed(0).replace('.', ',') + '°C'%>",
        scales: {
            xAxes: {
                gridLines: {
                    display: false,
                    zeroLineColor: '#00000000',
                    color: 'rgba(0,0,0,0)',
                },
                ticks: {
                    display: false,
                    color: 'rgba(0,0,0,0)',
                },
            },
            yAxes: {
                gridLines: {
                    display: false,
                    zeroLineColor: '#00000000',
                    color: 'rgba(0,0,0,0)',
                },
                ticks: {
                    display: false,
                    color: 'rgba(0,0,0,0)',
                },
            },
        },
        legend: {
            display: false,
        },
        tooltip: {}, // TODO
    };

    return { data, options };
};

export default useCostingAndEstimatingGraph;
