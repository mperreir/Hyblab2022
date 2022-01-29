class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    nextStep() {
        this.props.nextStep && this.props.nextStep();
    }

    nextSubStep() {
        this.setState({ subStepIndex: this.state.subStepIndex + 1 });
    }

    render() {
        return this.state.subPages[this.state.subStepIndex];
    }
}