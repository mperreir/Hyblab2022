class StepBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const bins = [...Array(this.props.nbStep || 5).keys()].map(i => {
            return (
                <div className='stepBin' style={{ width: `calc(100% / ${this.props.nbStep * 1.3})` }} key={i}>
                    {i <= this.props.currStep ? <div className='stepBin_completed'></div> : null}
                </div>
            )
        });

        return (
            <div className='stepBar'>
                <div className='stepBins_container'>{bins}</div>
                <div className='stepBar_bar'></div>
            </div>
        )
    }
}