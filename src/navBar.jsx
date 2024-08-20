import './css/navBar.css'

export const NavBar = () => {


    return (
        <nav style={{ margin: '4px 32px' }}>
            <ul>
                <li><span className='title-logo'>Linkevo</span></li>
            </ul>
            <ul>
                <li><a href="#" class="contrast"><button>Verificar link</button></a></li>
            </ul>
        </nav>
    )
}