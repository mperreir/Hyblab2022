class Step4Game extends React.Component {
  constructor(props) {
    super(props);
    if (Object.keys(this.props.game.data).length) {
      this.state = { ...this.props.game.data };
    } else {
      const chequesState = cheques.reduce(
        (previous, cheque) => {
          return {
            ...previous,
            [cheque.nameId]: {
              //error: false,
              isAcceptClick: false,
              isCancelClick: false,
              profil: {
                img: `img/step4Game/${cheque.nameId}.svg`,
                name: cheque.name,
              },
            },
          };
        },
        {}
      );

      const chequesNextStep = cheques.filter(
        (cheque) => cheque.valid
      );

      this.state = {
        ...chequesState,
        chequesNextStep: chequesNextStep,
        // TODO: check if all choices were made
        //validateDisabled: true,
        //...chequesState,
      };
    }
  }
  componentDidMount() {
    new Swiper(".step4game_cheques", {
      direction: "horizontal",
      slidesPerView: 1,
      mousewheel: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  clickCancel(id) {
    this.setState(
      {
        [id]: {
          ...this.state[id],
          isAcceptClick: false,
          isCancelClick: !this.state[id].isCancelClick,
        },
      },
      () => {
        this.isEnd();
      }
    );
  }
  clickAccept(id) {
    this.setState(
      {
        [id]: {
          ...this.state[id],
          isAcceptClick: !this.state[id].isAcceptClick,
          isCancelClick: false,
        },
      },
      () => {
        this.isEnd();
      }
    );
  }

  isEnd() {
    const tmpState = { ...this.state };
    delete tmpState.chequesNextStep;
    const keys = Object.keys(tmpState);
    const validateDisabled = keys.reduce(
      (previous, current) =>
        previous &&
        (tmpState[current].isAcceptClick || tmpState[current].isCancelClick)
    );
    if (validateDisabled) {
      this.isWin();
      this.props.enableGameButton();
    } else {
      this.props.disableGameButton();
    }
  }

  isWin() {
    const tmpState = JSON.parse(JSON.stringify(this.state));
    const isWin = cheques.reduce((previous, current) => {
      const valid = current.valid;
      const isValid =
        (valid && tmpState[current.nameId].isAcceptClick) ||
        (!valid && tmpState[current.nameId].isCancelClick);
      tmpState[current.nameId].error = !isValid;
      return previous && isValid;
    }, true);
    const gameState = {
      win: isWin,
      data: { ...tmpState },
      candidatesNextStep: stepsCandidates['4']
    };
    this.props.gameSaveState(gameState);
  }

  render() {
    const cards = cheques.map((cheque, id) => {
      const chequeState = this.state[cheque.nameId];
      return (
        <div className="swiper-slide step4game_cheque" key={id}>
          <ChequeCard profil={chequeState.profil} />
          <div
            className={`step4game_tampon ${
              chequeState.isAcceptClick
                ? "step4game_tampon_valid"
                : "step4game_tampon_cancel"
            }`}
            hidden={!(chequeState.isAcceptClick || chequeState.isCancelClick)}
          >
            <Tampon isValid={chequeState.isAcceptClick} cheque={true} />
          </div>
          <div className="step4game_pannelError" hidden={!chequeState.error}>
            <img src="img/warning.svg" />
          </div>
          <div className="step4game_tampon_button">
            <TamponButton
              isValid={true}
              isBlack={chequeState.isAcceptClick}
              onClick={() => this.clickAccept(cheque.nameId)}
            />
            <TamponButton
              isValid={false}
              isBlack={chequeState.isCancelClick}
              onClick={() => this.clickCancel(cheque.nameId)}
            />
          </div>
        </div>
      );
    });

    return (
      <div className="step4game">
        <div className="step4game_cheques swiper">
          <div className="swiper-wrapper">{cards}</div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    );
  }
}
