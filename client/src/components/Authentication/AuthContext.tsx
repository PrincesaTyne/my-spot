import React, { ReactNode, createContext, useEffect, useState } from "react"
import firebase from './firebase'

interface IAuth {
  userId: string;
  getAuth: boolean;
}

interface IAuthContext {
  currentUser: IAuth;
  setCurrentUser: (state: IAuth) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null)

//  type IAuthContext = [IAuth[], React.Dispatch<React.SetStateAction<IAuth[]>>]

// export const AuthContext = React.createContext<any>({})

export const AuthProvider: React.FC<ReactNode> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ userId: '', getAuth: false })
  const [pending, setPending] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user:any) => {
      setCurrentUser(user)
      setPending(false)
    })

  }, [])

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser, setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
