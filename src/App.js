import './App.css';
import React, {useState} from "react";
import './App.css'
import app from "./modules/firebase";
// const log = (...messages ) => {
//     if( process.env.debug) console.log(...messages)
// }

function App() {
    const [userIntent, setUserIntent] = useState('Register')
    const [ appUser, setUser] = useState()

    const onSubmit = async event => {

        event.preventDefault()
        const [email, password] = event.target

        if(userIntent === 'Register') {
            const response = await app.auth().createUserWithEmailAndPassword(email.value, password.value)
            console.log('authentication response', response)
            setUser(response.user)
        } else {
            const response = await app.auth().signInWithEmailAndPassword(email.value, password.value)

            console.log('authentication response', response)
            setUser(response.user)
        }
    }
    return <main>
        { !appUser && <form id="login-form" onSubmit={onSubmit}>
            <h1>{userIntent}</h1>
            {appUser && <h2>{appUser.email}</h2>}

            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input type="submit" value={userIntent}/>
            <button onClick={() => setUserIntent(userIntent === 'Register' ? 'Login' : 'Register')}>
                {userIntent === 'Register' ? 'Login' : 'Register'} instead
            </button>
        </form>}

        { appUser && <h1> Welcome { appUser.email } </h1>}
    </main>
}

export default App;
