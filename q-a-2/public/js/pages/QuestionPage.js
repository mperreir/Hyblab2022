class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='questionPage'>
                <Header step={this.props.step} resetStep={() => this.props.resetStep()} />
                <QuestionCard
                    questionTitle={this.props.questionTitle}
                    question={this.props.question}
                    answer={this.props.answer}
                    learnMoreLink={this.props.learnMoreLink}
                    buttonText={this.props.buttonText}
                    nextStepMessage={this.props.nextStepMessage}
                    buttonOnClick={() => this.props.buttonOnClick()}
                    className={this.props.className || ''}
                    step={this.props.step}
                />
            </div>
        )
    }
}