import { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import './css/slink.css'
import { useParams } from 'react-router-dom';

export const ValidatePassword = () => {
    const [token, setToken] = useState(null)
    const [password, setPassword] = useState('')
    const [optionPassword, setOptionPassword] = useState(false)
    const { code } = useParams();
    const [error, setError] = useState('')




    const { executeRecaptcha } = useGoogleReCaptcha();

    // useEffect(() => {
    //     handleToken()
    // }, [executeRecaptcha, error, optionPassword])

    useEffect(() => {

        get();

    }, [executeRecaptcha])



    const clear = () => {
        setError('')
        setPassword('')
    }

    const handleToken = async () => {
        if (!executeRecaptcha) {
            setToken(null)

            return
        }

        try {
            const tokenV3 = await executeRecaptcha('getLink');

            if (tokenV3) {
                setToken(tokenV3);
            } else {
                setToken(null);
                setError('Fallo en la verificación de reCAPTCHA, actualice la página ')
            }

        } catch (error) {
            setError('Fallo en la verificación de reCAPTCHA, actualice la página. ')
            setToken(null);

        }


        return
    };





    const get = async () => {






        const tokenV3 = await executeRecaptcha('getLink');

        if (!tokenV3) {
            setError('Fallo en la verificación de reCAPTCHA, actualice la página ')
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/v1/link/validate/${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: tokenV3
            }),
        })


        const dataResponse = await response.json();

        if (response.ok) {

            if (dataResponse.data.show) {
                window.location.href = dataResponse.data.originalUrl
            } else {

                setOptionPassword(true)
            }


        } else {

            setError(dataResponse.message ? dataResponse.message : 'Ocurrió un error. Intentelo más tarde.')

        }




        return


    }



    const validatePassword = async () => {



        if (password) {

            const tokenV3 = await executeRecaptcha('getLink');
            if (!tokenV3) {
                setError('Fallo en la verificación de reCAPTCHA, actualice la página ')
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/v1/link/validate-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: tokenV3,
                    password: password,
                    shortUrl: code
                }),
            })


            const dataResponse = await response.json();

            if (response.ok) {

                window.location.href = dataResponse.data.originalUrl


            } else {

                setError(dataResponse.message ? dataResponse.message : 'Ocurrió un error. Intentelo más tarde.')

            }
        } else {
            setError('Ingrese una contraseña válida')

        }




        return


    }



    return (

        <div className='body-slink'>


            {optionPassword ?
                <dialog open>
                    <article>
                        <header>
                            <p>
                                <strong> Validar contraseña </strong>
                            </p>
                        </header>
                        <div className='input-container-options'>

                            <div className='input-container'>
                                <input value={password} onChange={(e) => setPassword(e.target.value.trim())} type="url" placeholder="Ingrese contraseña" autocomplete="url" />


                            </div>
                        </div>
                        <footer>
                            <div className='button-container'>

                                <button onClick={() => validatePassword()} >
                                    Validar
                                </button>
                            </div>
                        </footer>

                    </article>
                </dialog>


                : <> </>

            }


            {error ?
                <dialog open>
                    <article>
                        <h2>Se produjo un error</h2>
                        <p>
                            {error}
                        </p>

                        <footer>

                            <button onClick={() => clear()}>Ok</button>
                        </footer>
                    </article>
                </dialog>

                : <></>
            }



        </div>

    )
}