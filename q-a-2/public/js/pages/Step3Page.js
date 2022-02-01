class Step3Page extends Page {
    constructor(props) {
        super(props);
        const step = 3;
        const data = props.data.steps['3'];
        const questions = data.questions;
        this.state = {
            subPages: [
                <MainStepPage step={step} nextSubStep={() => this.nextSubStep()}
                    subtitle="Declaration du patrimoine et des intérêts"
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
                    className='declarationPage'
                />,
                <QuestionPage
                    step={step}
                    buttonOnClick={() => this.nextSubStep()}
                    buttonText="Vérifier"
                    questionTitle={data.title}
                    question={questions[1].question}
                    answer={questions[1].answer}
                    learnMoreLink={questions[1].link}
                    nextStepMessage="Vérifier les déclarations de chaque candidat"
                    className='declarationPage'
                />,
                <GamePage
                    step={step}
                    title='Vérifie les déclarations des candidats.'
                    subtitle="Les candidats ont rempli leur déclaration du patrimoine et des intérêts mais tout n'a pas besoin d'être déclaré. Décoche ce qui n'est pas nécessaire."
                    buttonTitle='Valider'
                    returnToExplanations={() => this.returnToExplanations()}
                >
                    <Step3Game
                        disableGameButton={() => this.disableGameButton()}
                        enableGameButton={() => this.enableGameButton()}
                    />
                </GamePage>
            ],
            subStepIndex: 0
        }
    }
}