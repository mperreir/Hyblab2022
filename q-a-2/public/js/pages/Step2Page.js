class Step2Page extends Page {
    constructor(props) {
        super(props);
        const step = 2;
        const data = props.data.steps['2'];
        const questions = data.questions;
        this.state = {
            subPages: [
                <MainStepPage step={step} nextSubStep={() => this.nextSubStep()}
                    subtitle="Comment se présenter ?"
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextSubStep()}
                    buttonText="Continuer"
                    questionTitle={data.title}
                    question={questions[0].question}
                    answer={questions[0].answer}
                    learnMoreLink={questions[0].link}
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
                    nextStepMessage="Vérifier le nombre de signatures de chaque candidat"
                />,
                <GamePage
                    step={step}
                    title='Valide le nombre de signatures'
                    subtitle='Voici le nombre de signatures de chaque candidat·e. Sélectionne celleux qui peuvent continuer.'
                    buttonTitle='Valider'
                    nextStep={() => this.nextStep()}
                    returnToExplanations={() => this.returnToExplanations()}
                >
                    <Step2Game
                        enableGameButton={() => this.enableGameButton()}
                    />
                </GamePage>
            ],
            subStepIndex: 0
        }
    }
}