class Step7Page extends Page {
    constructor(props) {
        super(props);
        const step = 7;
        const data = props.data.steps['7'];
        const questions = data.questions;
        this.state = {
            subPages: [
                <MainStepPage step={step} nextSubStep={() => this.nextSubStep()}
                    subtitle="Le 2nd tour"
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextStep()}
                    buttonText="Dépouiller"
                    questionTitle={data.title}
                    question={questions[0].question}
                    answer={questions[0].answer}
                    learnMoreLink={questions[0].link}
                    nextStepMessage="Dépouiller les bulletins de vote et compter les voies"
                />,
            ],
            subStepIndex: 0
        }
    }
}