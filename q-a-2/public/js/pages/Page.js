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

    returnToExplanations() {
        this.setState({ subStepIndex: 1 });
    }

    enableGameButton() {
        this.setState({ gameButtonDisabled: true });
    }

    disableGameButton() {
        this.setState({ gameButtonDisabled: false });
    }

    render() {
        return this.state.subPages[this.state.subStepIndex];
    }
}