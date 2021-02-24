import React from 'react';
import {PropTypes} from 'prop-types';

class Connexion extends React.Component {

    goToApp = event => {
        event.preventDefault();
        const pseudo = this.boxInput.value;
        this.props.history.push(`/box/${pseudo}`);
    };

    render() {
        return (
            <div className="connexionBox" onSubmit={(e) => this.goToApp(e)}>
                <form className="connexion">
                    <input 
                        type="text"    
                        placeholder="Pseudo" 
                        pattern="[A-Za-z-]{1,}"
                        required 
                        ref={input => {this.boxInput = input}}
                    />
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        )
    }

    static contextTypes = {
        router: PropTypes.object
    }
}

export default Connexion;