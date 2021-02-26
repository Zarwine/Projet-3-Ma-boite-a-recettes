import React from 'react';

class Header extends React.Component {

    nicknameIntroduction = (nickname) => {
        return /[aeiouy]/i.test(nickname[0]) ? `d'${nickname}` : `de ${nickname}`
    }

    render() {
        return (
            <header>
                <h1>La boîte à recette {this.nicknameIntroduction(this.props.nickname)}</h1>
            </header>
        )
    }

    static propTypes = {
        nickname: React.PropTypes.string.isRequired
    }
}

export default Header;