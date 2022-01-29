class Step8Page extends Page {
    constructor(props) {
        super(props);
        const step = 8;
        const data = props.data.steps['8'];
        const questions = data.questions;
        this.state = {
            subPages: [
                <MainStepPage step={step} nextSubStep={() => this.nextSubStep()}
                    subtitle="L'investiture"
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextStep()}
                    buttonText="Continuer"
                    questionTitle={data.title}
                    question={questions[0].question}
                    answer={questions[0].answer}
                    learnMoreLink={questions[0].link}
                />
            ],
            subStepIndex: 0
        }
    }
}