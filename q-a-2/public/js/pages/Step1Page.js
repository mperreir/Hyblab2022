class Step1Page extends Page {
    constructor(props) {
        super(props);
        const data = props.data.steps['1'];
        const questions = data.questions;
        this.state = {
            subPages: [
                <MainStepPage step={1} nextSubStep={() => this.nextSubStep()}
                    subtitle="Qui peut se présenter à la présidence ?"
                />,
                <QuestionPage
                    step={1}
                    buttonOnClick={() => this.nextSubStep()}
                    buttonText="Continuer"
                    questionTitle={data.title}
                    question={questions[0].question}
                    answer={questions[0].answer}
                    learnMoreLink={questions[0].link}
                    nextStepMessage="Passer à l'indication suivante :"
                />,
                <QuestionPage
                    step={1}
                    buttonOnClick={() => this.nextStep()}
                    buttonText="Vérifier"
                    questionTitle={data.title}
                    question={questions[1].question}
                    answer={questions[1].answer}
                    learnMoreLink={questions[1].link}
                    nextStepMessage="Examine les profils des candidats"
                />,
            ],
            subStepIndex: 0
        }
    }
}