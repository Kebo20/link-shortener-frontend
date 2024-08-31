import './App.css'
import { List } from './list.jsx'
import { Slink } from './slink.jsx'
import { ValidateLink } from './validateLink.jsx'

import { NavBar } from './navBar.jsx'
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './NotFound.jsx'
import { ValidatePassword } from './validatePassword.jsx';
import usePageTracking from './usePageTracking';

function App() {

  usePageTracking();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Slink />} />
        <Route path="/validate-password/:code" element={<ValidatePassword />} />
        <Route path="/validate-link" element={<ValidateLink />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
