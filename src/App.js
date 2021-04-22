import './App.css';
import React, {useState, useEffect} from "react";
import './App.css'

/////////////////////
// Firebase config
////////////////////
import app from "./modules/firebase";

const db = app.firestore()

function App() {
    const [userIntent, setUserIntent] = useState('Register')
    const [appUser, setUser] = useState(undefined)
    const [address, setAdress] = useState('')
    const [loading, setLoading] = useState('Voldemort is GREAT')

    //On the mount of the component, ask firebase to tell us whether we are logged in
    //if we are logged in, set the user to state
    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    const onSubmit = async event => {

        event.preventDefault()
        const [email, password] = event.target

        if (userIntent === 'Register') {
            const response = await app.auth().createUserWithEmailAndPassword(email.value, password.value)
            console.log('authentication response', response)
            setUser(response.user)
        } else {
            const response = await app.auth().signInWithEmailAndPassword(email.value, password.value)
            console.log('authentication response', response)
            setUser(response.user)
        }
    }

    async function saveAddress() {
        await db.collection('addresses').doc(appUser.email).set({mine: address})
        alert('data saved')
    }

    return <main>

        {loading && <p>{loading}</p>}

        {/* If not logged in yet */}
        {!loading && !appUser && <form id="login-form" onSubmit={onSubmit}>
            <h1>{userIntent}</h1>
            {appUser && <h2>{appUser.email}</h2>}

            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input type="submit" value={userIntent}/>
            <button onClick={() => setUserIntent(userIntent === 'Register' ? 'Login' : 'Register')}>
                {userIntent === 'Register' ? 'Login' : 'Register'} instead
            </button>
        </form>}
        {/* If logged in */}
        {!loading && appUser && <div>
            <h1> Welcome {appUser.email}</h1>
            <input type="text" placeholder="address" value={address} onChange={e => setAdress(e.target.value)}/>
            <button onClick={saveAddress}>Save</button>
        </div>}
    </main>
}

export default App;
