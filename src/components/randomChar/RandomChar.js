import { Component } from 'react/cjs/react.production.min';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage'
class RandomChar extends Component {

    state = {
        char:{},
        loading : true,
        error : false,

    }
    componentDidMount(){
        this.updareChar()
        
    }
    marvelService = new MarvelService();
    
    onChatLoader = (char)=>{
        this.setState({
            char,
            loading: false,
        })
    }
    onError = ()=>{
        this.setState({
            loading: false,
            error : true
        })
    }


    updareChar = ()=>{
        const id =Math.floor(Math.random()* (1011400 - 1011000) + 1011000);
        this.marvelService
        .getCharacter(id)
        .then(this.onChatLoader)
        .catch(this.onError)
    }
    render(){
        const {char,loading, error} = this.state
        const errorMasage = error ? <ErrorMasage/> : null;
        const loadingMasage = loading ? <Spinner/> : null;
        const content = !(loading || error)? <Vies char={char}/>: null
        return(
            <div className="randomchar">
            {errorMasage}
            {loadingMasage}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={this.updareChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    ) 
    }
}
   const Vies = ({char})=>{
        const {name, description, thumbnail, homepage, wiki} = char

       const  sliseCharepterInfo = (info)=>{
            if(info === undefined || info === ''){
                return 'This charepter not hawe info in this wiki'
            }if(info.length >= 80){
                return info.slice(0,80) + '...'
            }else{
                return info
            }
        }
        let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
        }


       return(
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {sliseCharepterInfo(description)}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
       )
    }
    
        


export default RandomChar;