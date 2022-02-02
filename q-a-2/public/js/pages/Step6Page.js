class Step6Page extends Page {
    constructor(props) {
        super(props);
        const step = 6;
        const data = props.data.steps['6'];
        const questions = data.questions;
        this.state = {
            step: step,
            subPages: [
                <MainStepPage step={step} nextSubStep={() => this.nextSubStep()}
                    subtitle="Le premier tour"
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextSubStep()}
                    buttonText="Dépouiller"
                    questionTitle={data.title}
                    question={questions[0].question}
                    answer={questions[0].answer}
                    learnMoreLink={questions[0].link}
                    nextStepMessage="Dépouiller les bulletins de vote et compter les votes"
                />,
                <GamePage
                    step={step}
                    title='Le premier tour'
                    subtitle="Clique sur l'urne pour ouvrir toutes les enveloppes."
                    buttonTitle='Continuer'
                    returnToExplanations={() => this.returnToExplanations()}
                    nextStep={() => this.nextStep()}
                >
                    <Step6Game />
                </GamePage>
            ],
            subStepIndex: 0
        }
    }
}