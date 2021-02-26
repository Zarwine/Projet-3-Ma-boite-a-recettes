import React from 'react';
import AddRecipe from './AddRecipe';
import base from '../base';

class Admin extends React.Component {

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        base.onAuth(user => {
            if (user) {
                this.manageLogin(null, {user})
            }
        })
    }

    manageUpdate = (event, key) => {
        const recipe = this.props.recipes[key]
        const updateRecipe = {
            ...recipe,
            [event.target.name]: event.target.value
        }
        this.props.updateRecipe(key, updateRecipe)
    }

    renderLogin = () => {
        return (
            <div className='login'>
                <h2>Connecte toi pour créer tes recettes !</h2>
                <button className="facebook-button" onClick={() => this.login('facebook')} >
                    Me connecter avec Facebook
                </button>
            </div>
        )
    }

    login = provider => {
        base.authWithOAuthPopup(provider, this.manageLogin)
    }

    logout = () => {
        base.unauth()
        this.setState({uid: null})
    }

    manageLogin = (err, authData) => {
        if (err) {
            console.log(err)
            return
        }

        const boxRef = base.database().ref(this.props.nickname)
        boxRef.once('value', snapshot => {
            const data =  snapshot.val() || {}
            if (!data.owner) {
                boxRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        })
    }

    renderAdmin = key => {
        const recipe = this.props.recipes[key];
        return (
            <div className="card" key={key}>
            <form className="admin-form">
                <input type="text" placeholder="Nom de la recette" onChange={e => this.manageUpdate(e, key)} value={recipe.nom} />
                <input type="text" placeholder="Adresse de l'image" onChange={e => this.manageUpdate(e, key)} value={recipe.image} />
                <textarea rows="3" placeholder="Liste des ingrédients séparés par une virgule" onChange={e => this.manageUpdate(e, key)} value={recipe.ingredients}></textarea>
                <textarea rows="3" placeholder="Liste des instructions (une par ligne)" onChange={e => this.manageUpdate(e, key)} value={recipe.instructions}></textarea>
            </form>
            <button onClick={() => this.props.deleteRecipe(key)}>Supprimer</button>
        </div>
        )
    }

    render() {
        const logout = <button onClick={this.logout}>Déconnexion!</button>

        if (!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div className="login">
                    {this.renderLogin()}
                    <p>Tu n'es pas le propriétaire de cette boîte à recette.</p>
                </div>
            )
        }
        const adminCards = Object
            .keys(this.props.recipes)
            .map(this.renderAdmin);

        return (
            <div className="cards">
                <AddRecipe AddRecipe={this.props.AddRecipe}/>
                {adminCards}
                <footer>
                    <button onClick={this.props.loadExemples}>
                        Remplir
                    </button>
                    {logout}
                </footer>
            </div>
        )
    }
    
    static propTypes = {
        recipes: React.PropTypes.object.isRequired,
        loadExemples: React.PropTypes.func.isRequired,
        addRecipe: React.PropTypes.func.isRequired,
        updateRecipe: React.PropTypes.func.isRequired,
        deleteRecipe: React.PropTypes.func.isRequired,
        nickname: React.PropTypes.string.isRequired
    }
}

export default Admin;