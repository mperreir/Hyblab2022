class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subStepIndex: 0
        }
    }

    nextStep() {
        this.props.nextStep && this.props.nextStep();
    }

    nextSubStep() {
        this.setState({ subStepIndex: this.state.subStepIndex + 1 });
    }

    render() {
        return this.props.subPages[this.state.subStepIndex];
    }
}