import React, { useCallback, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from './firebase'
import './Authentication.css'
import { AuthContext } from './AuthContext'
import { db } from './firebase'

const Login: React.FC = ({history}: any) => {
    const { currentUser }: any = useContext(AuthContext)

    const onSubmit = useCallback(event => {
        event.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const user = result.user
            if(!user) return null

            db.collection('users').where('email', '==', user.email).get().then(snapshot => {
                if(snapshot.empty){
                    db.collection('users').add({
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                        role: 'user'                        
                    })
                }
            })
            history.push('/')
          }).catch(function(error) {
              alert(error.message)
          });
    }, [history])

    if (currentUser){
        console.log(currentUser)
        return <Redirect to='/' />
    }

    return (
        <div className='container'>
            <div className='login'>
                <button className='login-button' type='button' onClick={onSubmit} >Log in with Google</button>
            </div>
        </div>    
    )
}

export default Login
