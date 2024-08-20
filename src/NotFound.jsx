import { Link } from 'react-router-dom';

export const NotFound = () => {
    return <dialog open>
        <article>
            <header>
                <p>
                    <strong>404 NOT FOUND PAGE </strong>
                </p>
            </header>
            <p>
                <Link to="/">IR A INICIO</Link>
            </p>
            <footer>

            </footer>

        </article>
    </dialog>

}

