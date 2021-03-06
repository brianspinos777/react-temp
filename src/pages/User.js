import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyStore from '../store/MyStore'
import { getUserWithId } from '../actions/actions.js'


class User extends Component {
    constructor(props){
        super()

        console.log(props.match.params); // params from link

        this.changeFavCharacters = this.changeFavCharacters.bind(this)
        this._getUserWithId = this._getUserWithId.bind(this)
        this._doSomething = this._doSomething.bind(this)
    }

    changeFavCharacters(){
        // MyStore.dispatch is a function to send data to the  STORE
        MyStore.dispatch({type: "CHANGE_FAV_USERS", payload: ['Anakin', 'Darth Vader']})
    }

    _getUserWithId(id){
        // Test, using promise middleware
        MyStore.dispatch(getUserWithId(id))
    }

    _doSomething(){
        alert('Something done!');
    }

    render() {
        let user_id = this.props.match.params.id

        return (
            <div className="User">

                <h1>User Component</h1>
                <p>id: {this.props.match.params.id}</p>
                <hr />

                <button onClick={() => this.changeFavCharacters()}>Change Characters</button>
                <button onClick={() => this._doSomething()}>Do something!</button>
                <h3>Fav Characters</h3>
                {
                    this.props.start_wars_characters.map((character, index )=>(
                        <p key={index}>{character}</p>
                    ))
                }
                <hr />

                <button onClick={() => this._getUserWithId(user_id)}>Get user with id {user_id}</button>
                {/* I know userGroup does not make sense here... */}
                <p>email: {this.props.userGroup.email}</p>
                <hr />

                <p>foobar: {this.props.foobar}</p>

            </div>
        )
    }
}

//
// Remember to attach this function to this component by using:
//     export default connect(mapStateToProps)(User)
//
function mapStateToProps(state){
    // console.log("CURRENT STATE:", state)

    return {
        ...state.users, // will make available `state.users` to `this.props` in this component
        foobar: 123, // will make available `this.props.foobar` in this component
        // users: state.users, // will make available `this.props.users` in this component
    }
}

//
// Attach the `mapStateToProps` function to this component. (A must!)
//
export default connect(mapStateToProps)(User)
