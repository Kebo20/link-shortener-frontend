import { Link } from 'react-router-dom'
import './css/navBar.css'

export const NavBar = () => {


    return (
        <nav style={{ margin: '4px 32px' }}>
            <ul>
                <li><Link to="/" ><span className='title-logo'>Linkevo</span></Link></li>
            </ul>
            <ul>
                <li><Link to="/validate-link" class="contrast"><button>Verificar link</button></Link></li>
            </ul>
        </nav>
    )
}