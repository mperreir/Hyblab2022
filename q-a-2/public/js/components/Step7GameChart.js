class Step7GameChart extends React.Component {
    constructor(props) {
        super(props);
        this.chart = null;
    }

    componentDidMount() {
        const ctx = document.getElementById('chart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.props.candidates.map(c => c.name),
                datasets: [{
                    label: "% de votes",
                    data: this.props.data,
                    backgroundColor: this.props.candidates.map(c => c.color),
                    borderColor: [
                        'black',
                        'black'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    labels: {
                        render: 'image',
                        textMargin: 5,
                        images: this.props.candidates.map(c => ({ src: 'img/step67Game/' + c.head_img, width: 30, height: 30 }))
                    }
                },
                tooltips: {
                    enabled: false
                },
                layout: {
                    padding: {
                        top: 30
                    }
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display:false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            display: false
                        },
                        gridLines: {
                            display:false
                        }
                    }]
                }
            }
        })
    }

    componentDidUpdate() {
        this.chart.data.datasets[0].data = this.props.data;
        this.chart.update();
    }

    render() {
        return (
            <canvas id="chart"></canvas>
        )
    }
}