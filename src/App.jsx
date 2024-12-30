import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext, FirebaseContext } from './store/Context.jsx';
import { doc, getDoc } from "firebase/firestore";



/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Create from './Pages/Create.jsx'


function App() {

  const { setUser } = useContext(AuthContext);
  const {auth , db} = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
        } else {
          console.log("No such user document!");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db, setUser]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/create' element={<Create/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
