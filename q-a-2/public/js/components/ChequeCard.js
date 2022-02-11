class ChequeCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="chequeCard">
        <img
          className="chequeCard_img"
          src={this.props.profil.img}
          alt="Dossier"
        />
      </div>
    );
  }
}
