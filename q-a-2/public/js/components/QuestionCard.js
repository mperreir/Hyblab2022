class QuestionCard extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <div className='questionCard-container'>
                <div className='questionCard'>
                    <h2 className='questionCard-questionTitle'>{this.props.questionTitle}</h2>
                    <div className='questionCard-questionBlock'>
                        <p className='questionCard-question'>{this.props.question}</p>
                        <p className='questionCard-answer'>{this.props.answer}</p>
                        <LearnMore link={'#'}/>
                    </div>
                    <div className='questionCard-nextStep'>
                        <p>Passer à l'indication suivante:</p>
                        <Button value={'Continuer'} disabled={false} white={false}/>
                    </div>
                </div>
            </div>
        )
    }
}