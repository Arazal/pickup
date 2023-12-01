
import './App.css';
import NewDocument from './components/NewDocument';
import { Link, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Documents from './components/Documents'
import Pickup from './components/Pickup'

function App() {
  return (
    <div className="App">
        <nav className="w-full rounded-md">
          <ol className="list-reset flex">
            {/* <li>
              <Link
                to={'/home'}
                className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                >Home
                </Link>
            </li>
            <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
            </li> */}
            <li>
              <Link
                  to={"/newdocument"}
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >New Document
                </Link>
            </li>
            <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
            </li>
            <li>
              <Link
                  to={"/documents"}
                  className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >Documents
                </Link>
            </li>
            <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
            </li>
           
          </ol>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newdocument" element={<NewDocument />} />
          <Route path="/documents" element={<Documents />} />
          {/* <Route path="/pickup" element={<Pickup />} /> */}
        </Routes>
     
    </div>
  );
}

export default App;
