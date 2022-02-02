class Step4Page extends Page {
  constructor(props) {
    super(props);
    const step = 4;
    const data = props.data.steps["4"];
    const questions = data.questions;
    this.state = {
      subPages: [
        <MainStepPage
          step={step}
          nextSubStep={() => this.nextSubStep()}
          subtitle="Financement de la campagne"
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
          buttonOnClick={() => this.nextStep()}
          buttonText="Vérifier"
          questionTitle={data.title}
          question={questions[1].question}
          answer={questions[1].answer}
          learnMoreLink={questions[1].link}
          nextStepMessage="Valide les chèques qui peuvent financer les campagnes"
        />,
        <GamePage
          step={step}
          title="Valide (ou non) ces chèques"
          subtitle="Vérifie si ces chèques peuvent financer la campagne des candidats."
          buttonTitle="Valider"
          nextStep={() => this.nextStep()}
          returnToExplanations={() => this.returnToExplanations()}
        >
          <Step4Game
            disableGameButton={() => this.disableGameButton()}
            enableGameButton={() => this.enableGameButton()}
          />
        </GamePage>,
      ],
      subStepIndex: 0,
    };
  }
}
