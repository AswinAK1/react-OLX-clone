import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import firebase from './Firebase/Config.jsx'
import './index.css'
import Context,{FirebaseContext } from './store/Context.jsx'

createRoot(document.getElementById('root')).render(

  <FirebaseContext.Provider value={firebase}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
)