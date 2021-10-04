import React, { ReactNode, createContext, useEffect, useState } from "react"
import firebase from './firebase'

type UserType = firebase.User | null

export type ContextType = {
  currentUser: UserType;
  setCurrentUser: (state: UserType) => void;
}

export const AuthContext = createContext<ContextType>({
  currentUser: null,
  setCurrentUser: () => {}
})

export const AuthProvider: React.FC<ReactNode> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [pending, setPending] = useState<boolean>(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: UserType) => {
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
