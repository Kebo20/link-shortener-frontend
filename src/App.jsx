import './App.css'
import { List } from './list.jsx'
import { Slink } from './slink.jsx'
import { NavBar } from './navBar.jsx'
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './NotFound.jsx'
import { Redirect } from './redirect.jsx';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Slink />} />
        <Route path="/validate-password/:code" element={<Redirect />} />
        <Route path="/validate" element={<Slink />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
