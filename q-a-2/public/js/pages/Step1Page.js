class Step1Page extends Page {
    constructor(props) {
        super(props);
        const step = 1;
        const data = props.data.steps['1'];
        const questions = data.questions;
        this.state = {
            subPages: [
                <MainStepPage step={1} nextSubStep={() => this.nextSubStep()}
                    subtitle="Qui peut se présenter à la présidence ?"
                    resetStep={() => this.props.resetStep()}
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextSubStep()}
                    buttonText="Continuer"
                    questionTitle={data.title}
                    question={questions[0].question}
                    answer={questions[0].answer}
                    learnMoreLink={questions[0].link}
                    resetStep={() => this.props.resetStep()}
                    nextStepMessage="Passer à l'indication suivante :"
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextSubStep()}
                    buttonText="Vérifier"
                    questionTitle={data.title}
                    question={questions[1].question}
                    answer={questions[1].answer}
                    learnMoreLink={questions[1].link}
                    resetStep={() => this.props.resetStep()}
                    nextStepMessage="Examine les profils des candidat·e·s"
                />,
                <GamePage
                    step={step}
                    title='Examine ces candidatures'
                    subtitle="Les candidat·e·s t’ont envoyé leurs profils, à toi de sélectionner celleux qui peuvent continuer."
                    buttonTitle='Valider'
                    nextStep={() => this.nextStep()}
                    resetStep={() => this.props.resetStep()}
                    returnToExplanations={() => this.returnToExplanations()}
                >
                    <Step1Game
                        disableGameButton={() => this.disableGameButton()}
                        enableGameButton={() => this.enableGameButton()}
                    />
                </GamePage>
            ],
            subStepIndex: 0
        }
    }
}