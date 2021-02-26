import React from 'react';
import Header from './Header';
import Admin from './Admin';
import Card from './Card.js';
import recipes from '../recipes.js';
import base from '../base.js';

class App extends React.Component {

    state = {
        recipes: {}
    }

    componentWillMount() {
        this.ref = base.syncState( `${this.props.match.params.nickname}/recipes`, {
            context: this,
            state: 'recipes'
        } )
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    loadExemple = () => {
        this.setState({recipes})
    }

    addRecipe = (recipe) => {
        const recipes = {...this.state.recipes}
        const timestamp = Date.now()
        recipes[`recipe-${timestamp}`] = recipe
        this.setState({recipes})
    }

    updateRecipe = (key, updateRecipe) => {
        const recettes = {...this.state.recipes}
        recettes[key] = updateRecipe
        this.setState({recipes})
    }

    deleteRecipe = (key) => {
        const recipes = {...this.state.recipes}
        recipes[key] = null
        this.setState({recipes})
    }

    render() {

        const cards = Object
            .keys(this.state.recipes)
            .map(key => <Card key={key} details={this.state.recipes[key]} />)

        return (
            <div className="box">
                <Header nickname={this.props.match.params.nickname} />
                <div className="cards">
                    {cards}
                </div>
                <Admin 
                    recipes={this.state.recipes}
                    loadExemples={this.loadExemple} 
                    addRecipe={this.addRecipe}
                    updateRecipe={this.updateRecipe}
                    deleteRecipe={this.deleteRecipe}
                    nickname={this.props.match.params.nickname}
                />
            </div>
        )
    }

    static propTypes = {
        match: React.PropTypes.object.isRequired,
    }
}

export default App;