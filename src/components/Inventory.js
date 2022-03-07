import React from 'react';
import PropTypes from 'prop-types';
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, {firebaseApp} from "../base";

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
     uid: null,
     owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged( user => {
            if(user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async (authData) => {
        //1. Look up the current data in the firebase database
         const store = await base.fetch(this.props.storeID, {context: this});
        //2. Claim it if there is no owner
        if (!store.owner){
            //save it as our own
            await base.post(`${this.props.storeID}/owner`, {
                data: authData.user.uid
            })
        }
        //3. Set state of inventory component to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null})
    }

    render() {
        const logout = <button onClick={this.logout}>Logout!! </button>

        // Check if user is logged in
        if (!this.state.uid){
            return <Login authenticate={this.authenticate}/>;
        }
        // Check if user is not owner of the store
        if (this.state.uid !== this.state.owner) {
            return <div>
                <p>Sorry! You are not the owner.</p>
                {logout}
            </div>
        }
        //User must be the owner so render the Inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} fish={this.props.fishes[key]}/>)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Fish Samples</button>
            </div>
        )
    }
}



export default Inventory;