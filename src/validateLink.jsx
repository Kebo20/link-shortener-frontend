import { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import './css/slink.css'

export const ValidateLink = () => {
    const [password, setPassword] = useState('')
    const [optionPassword, setOptionPassword] = useState(false)
    const [error, setError] = useState('')
    const [code, setCode] = useState('')
    const [originalUrl, setOriginalUrl] = useState('')



    const { executeRecaptcha } = useGoogleReCaptcha();


    const clear = () => {
        setError('')
        setPassword('')
    }


    const get = async () => {

        setOriginalUrl('')
        setPassword('')



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
                setOriginalUrl(dataResponse.data.originalUrl)
            } else {

                setOptionPassword(true)
            }


        } else {

            const errorMessagge = dataResponse.message

            if (errorMessagge) {


                if (Array.isArray(errorMessagge)) {

                    const aMessagge = errorMessagge.map((m) => m.message)
                    setError(aMessagge.join(' , '))

                } else {
                    setError(errorMessagge)
                }

            } else {
                setError('Ocurrió un error. Intentelo más tarde.')
            }

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

                setOptionPassword(false)
                setOriginalUrl(dataResponse.data.originalUrl)


            } else {

                const errorMessagge = dataResponse.message

                if (errorMessagge) {


                    if (Array.isArray(errorMessagge)) {

                        const aMessagge = errorMessagge.map((m) => m.message)
                        setError(aMessagge.join(' , '))

                    } else {
                        setError(errorMessagge)
                    }

                } else {
                    setError('Ocurrió un error. Intentelo más tarde.')
                }

            }
        } else {
            setError('Ingrese una contraseña válida')

        }




        return


    }

    const validateCode = () => {

        return (code && code.length >= 6)

    }

    return (

        <div className='body-slink'>

            <div className='container'>

                <div className='input-container'>
                    <input className='input-personalize-link-validate' readOnly value='https://linkevo.app/' />
                    <input className='input-personalize-code-validate' value={code} onChange={(e) => setCode(e.target.value.trim())} type="url" placeholder="Ingrese tu código" autocomplete="url" />





                </div>


                <div className='buttons-container'>

                    <button onClick={get} disabled={!validateCode()}>
                        Validar
                    </button>


                </div>


            </div>



            {originalUrl ?
                <dialog open>
                    <article>
                        <header>
                            <p>
                                <strong> Url original: </strong>
                            </p>
                        </header>
                        <div className=''>

                            <a target='_blank' href={originalUrl}>{originalUrl}</a>

                            <p>

                            </p>
                            <p>
                                {/* <i>* Verifique que sea un destino seguro</i> */}
                            </p>
                        </div>
                        <footer>
                            <div className='button-container'>

                                <button onClick={() => setOriginalUrl('')} >
                                    Ok
                                </button>
                            </div>
                        </footer>

                    </article>
                </dialog>


                : <> </>

            }

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

                                <button class="secondary" onClick={() => setOptionPassword(false)} >
                                    Cerrar
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