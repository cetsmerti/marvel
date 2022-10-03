import { Component } from 'react/cjs/react.production.min';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state ={
        char:null,
        loading: false,
        error: false
   }
    marvelService = new MarvelService();
    componentDidMount(){
        this.charInfo();
    }
    componentDidUpdate(prevProp){
        if(this.props.charId !== prevProp.charId){
            this.charInfo();
        }
    }
   
   loadingChar = (char)=>{
    this.setState({
        char,
        loading: false
    })
   }
   errorChar = ()=>{
    this.setState({
        loading: false,
        error: true
    })
   }
   charInfo = ()=>{
    const {charId}=this.props
    if(!charId){
        return
    }
    this.marvelService.getCharacter(charId)
    .then(this.loadingChar)
    .catch(this.errorChar)
   }
    render(){
        const {error,loading,char} = this.state
        const skeleton = char || loading || error? null: <Skeleton/>;
        const errorMasage = error? <ErrorMasage/>: null;
        const loadingMasage = loading?<Spinner/>:null
        const content = !(loading || error||!char)? <View char= {char}/>:null
        return (
            <div className="char__info">
                {skeleton}
                {errorMasage}
                {loadingMasage}
                {content}
            </div>
        )
    }
}
const View = ({char})=>{
    let imgStyle = {'objectFit' : 'cover'};

    const {name, description, thumbnail, homepage, wiki, comics} = char
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit' : 'contain'};
        }
    return(
        <>
        <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div  className="char__info-name">{name}</div>
                    <div  className="char__btns">
                        <a tabIndex={0} href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a tabIndex={0} href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list" >
            {comics.length === 0? <li className="char__comics-item" key={0}>not have comics rigth now</li> :null}
            {
               comics.slice(0,10).map((item, id)=>{
                        
                return(
                        <li className="char__comics-item" key={id}>
                        {item.name}
                        </li>
                )
                })}
               
            </ul>
        </>
    )
}

export default CharInfo;