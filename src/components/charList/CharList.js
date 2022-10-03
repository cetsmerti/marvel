import { Component } from 'react/cjs/react.production.min';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMasage from '../errorMasage/ErrorMasage';



class CharList extends Component {
   state ={
        charList:[],
        loading: true,
        error: false,
        itemLoading: false,
        offset: 210
   }
   componentDidMount(){
    this.allChar()
    
}
    marvelService = new MarvelService();

   loadingChar = (newCharList)=>{
    this.setState(({offset,charList})=>({
        charList: [...charList,...newCharList],
        loading: false,
        itemLoading: false,
        offset: offset +9
    }))
   }
   errorChar = ()=>{
    this.setState({
        loading: false,
        error: true
    })
   }
   newCharepterLoading = ()=>{
    this.setState({
        itemLoading: true
    })
   }
   allChar = (offset)=>{
    this.newCharepterLoading();
    this.marvelService.getAllCharacters(offset)
    .then(this.loadingChar)
    .catch(this.errorChar)
   }
   activchar = (e)=>{
    if(e.currentTarget.classList.contains('selected')){
        e.currentTarget.classList.remove('selected')
    }else{
        e.currentTarget.classList.add('selected')
    }
   }
   renderChar = (arr)=>{
    const items = arr.map((item)=>{
        let imgStyle = {'objectFit' : 'cover'};
        if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit' : 'contain'};
        }
        return(
            <li tabIndex={0}
            ref={this.setRef} className="char__item" key = {item.id}
            onClick={(e)=>{this.activchar(e);
                this.props.changeCharId(item.id)}} >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li> 
        )
    })
    return(
        <ul className="char__grid" >
            {items}
            </ul>
    )
   }
    render(){
        const {error,loading,charList,itemLoading,offset} = this.state
        const chareters = this.renderChar(charList)
        const errorMasage = error? <ErrorMasage/>: null;
        const loadingMasage = loading?<Spinner/>:null
        const charLists = !(loading || error)? chareters:null
        return (
            <div className="char__list">
                {errorMasage}
                {loadingMasage}
                {charLists}
                <button className="button button__main button__long"
                disabled={itemLoading}
                onClick={()=>this.allChar(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;