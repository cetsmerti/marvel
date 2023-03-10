import { Component } from "react/cjs/react.production.min";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundery from "../errorBoudery/ErrorBoundery";

class App extends Component {
    state ={
        idCharepter : null
    }
    changeCharId =(idCharepter)=>{
        this.setState({
            idCharepter
        })
    }
    render(){
        return(
            <div className="app">
                <AppHeader/>
            <main>
                <ErrorBoundery>
                    <RandomChar/>
                </ErrorBoundery>
                     <div className="char__content">
                    <ErrorBoundery>
                        <CharList changeCharId={this.changeCharId} />
                    </ErrorBoundery>
                    <ErrorBoundery>
                        <CharInfo charId = {this.state.idCharepter}/>
                    </ErrorBoundery>
                    </div>

                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
        )
    }

}

export default App;