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
        this.setState({ gameButtonDisabled: false });
    }

    disableGameButton() {
        this.setState({ gameButtonDisabled: true });
    }

    candidatesClimbSteps(candidates) {
        stepsCandidates[`${this.props.step + 1}`] = [...candidates];
        stepsCandidates[`${this.props.step}`] = stepsCandidates[`${this.props.step}`].filter(c => !candidates.some(cc => c.id === cc.id));
    }

    render() {
        return this.state.subPages[this.state.subStepIndex];
    }
}