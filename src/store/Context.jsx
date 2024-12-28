import { createContext, useState } from 'react';
import firebase from '../Firebase/Config'

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

function Context({children}){
  const [user,setUser] = useState(null)

  return(
    <FirebaseContext.Provider value={firebase}>
      <AuthContext.Provider value={{user,setUser}}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>

  )
}
export default Context