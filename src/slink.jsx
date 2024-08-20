import { useState, useEffect } from 'react'
import { useSave } from './hooks/useSave.js'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import './css/slink.css'

function TypingEffect() {
    const [displayText, setDisplayText] = useState('');
    const [complete, setComplete] = useState(false);

    const text = 'Acorta tus links!'

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText(text.substring(0, index + 1));
            index += 1;
            if (index === text.length) {
                clearInterval(interval);
                setComplete(true)
            }
        }, 130); // Ajusta el tiempo de retraso según lo rápido que quieras que se escriba
        return () => clearInterval(interval); // Limpia el intervalo si el componente se desmonta
    }, [text]);

    return <span className={complete ? 'title type-complete' : 'title'}>{displayText}</span>;
}

export const Slink = () => {
    const { handleSave, handleClear, tasks } = useSave()
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [shortLink, setShortLink] = useState('')
    const [token, setToken] = useState(null)
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')

    const [optionPassword, setOptionPassword] = useState(false)
    const [optionPersonalize, setOptionPersonalize] = useState(false)

    const [loading, setLoading] = useState(false)



    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        handleToken()
    }, [executeRecaptcha, shortLink, error, loading])


    const handleToken = async () => {
        if (!executeRecaptcha) {
            setToken(null)

            return;
        }

        try {
            const tokenV3 = await executeRecaptcha('shortingLink');
            if (tokenV3) {
                setToken(tokenV3);

            } else {
                setToken(null);
                setError('Fallo en la verificación de reCAPTCHA, actualice la página ')

            }

        } catch (error) {
            setError('Fallo en la verificación de reCAPTCHA, actualice la página ')
            setToken(null);

        }



    };





    const shorten = async () => {
        //if (e.key === 'Enter') {
        console.log(`${import.meta.env.VITE_BACKEND_HOST}/v1/link`)
        setLoading(true)


        if (validateLink() && validateCode() && validatePassword()) {

            if (token) {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/v1/link`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token, originalUrl: input, description: '',
                        password: optionPassword ? password : undefined,
                        shortUrl: optionPersonalize ? code : undefined
                    }),
                })


                const dataResponse = await response.json();

                if (response.ok) {

                    setError('')
                    setShortLink(`${import.meta.env.VITE_HOST}/${dataResponse.data.shortUrl}`)


                } else {

                    setShortLink('')
                    setError(dataResponse.message ? dataResponse.message : 'Ocurrió un error. Intentelo más tarde.')
                    console.log(dataResponse)

                }
            } else {
                setShortLink('')
                setError('Fallo en la verificación de reCAPTCHA, actualice la página o intentelo más tarde ')

            }


            setLoading(false)

            return

        } else {
            setShortLink('')
            // setError('Verifique la información ingresada.')
            setLoading(false)

            return
        }



        // }
    }

    const validateLink = () => {
        // try {
        // new URL(newLink);
        const regex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i

        return (regex.test(input))


        // } catch (_) {
        //     return false
        // }
    }

    const validatePassword = () => {

        if (!optionPassword) return true
        return (optionPassword && password && password.length >= 4)

    }

    const validateCode = () => {

        console.log('code')
        if (!optionPersonalize) return true
        return (optionPersonalize && code && code.length >= 6)

    }

    const clear = () => {
        window.location.reload();
    }

    const clearError = () => {
        setError('')
        setShortLink('')
    }

    const copy = () => {
        if (shortLink) {
            navigator.clipboard.writeText(shortLink).then(() => {
                alert('Link copiado al portapapeles');
            }).catch(err => {
            });
        }

    }
    return (

        <div className='body-slink'>


            {shortLink ?
                <dialog open>
                    <article>
                        <header>
                            <p>
                                <strong>🗓️ Link acortado </strong>
                            </p>
                        </header>
                        <p>
                            <a target='_blank' href={shortLink}>{shortLink}</a>
                        </p>
                        <footer>
                            <div className='button-container'>

                                <button class="secondary" onClick={() => { clear() }}>
                                    Cerrar
                                </button>
                                <button onClick={() => copy()} >
                                    Copiar Link
                                </button>
                            </div>
                        </footer>

                    </article>
                </dialog>


                : <>
                    <div className='container-title' >
                        <TypingEffect />
                        <span style={{ textAlign: 'center' }}>
                            Linkevo es un servicio de acortamiento de URL gratuito, fácil de usar y personalizable.
                        </span>
                    </div>

                    <div className='container'>
                        <div className='input-container'>
                            <input value={input} onChange={(e) => setInput(e.target.value.trim())} type="url" placeholder="Ingrese tu link aquí" autocomplete="url" aria-invalid={!validateLink() ? 'true' : ''} aria-describedby="valid-input" />

                            {
                                !validateLink() && input ?
                                    <small id="valid-input">Ingrese un link válido</small>
                                    : <></>
                            }

                        </div>

                        <div className='buttons-container'>

                            <button onClick={() => shorten()} disabled={loading} >
                                Acortar
                            </button>
                            {/* <button onClick={clear} >
                        Limpiar
                    </button> */}

                        </div>

                    </div>
                    <div className='container-options'>
                        <div >
                            <fieldset>
                                <label>
                                    <input checked={optionPersonalize} onChange={(e) => setOptionPersonalize(e.target.checked)} type="checkbox" role="switch" />
                                    Personalizar link
                                </label>

                            </fieldset>
                        </div>


                        {optionPersonalize ?
                            <div className='input-container-options' >

                                <div className='input-container' style={{ 'display': 'flex', 'flex-direction': 'row !important' }}>
                                    <input className='input-personalize-link' readOnly value='https://linkevo.app/' />
                                    <input className='input-personalize-code' value={code} onChange={(e) => setCode(e.target.value.trim())} type="url" placeholder="Ingrese tu código" autocomplete="url" aria-invalid={!validateCode() ? 'true' : ''} aria-describedby="valid-code" />


                                </div>
                                {
                                    !validateCode() ?
                                        <>
                                            <small id="valid-code" style={{ color: '#ce7e7b' }}>Ingrese un código de alfanúmerico de 6 caracteres como mínmo</small>
                                        </>
                                        : <></>
                                }

                            </div>
                            : <></>}
                    </div>
                    <div className='container-options'>
                        <div>
                            <fieldset>
                                <label>
                                    <input checked={optionPassword} onChange={(e) => setOptionPassword(e.target.checked)} type="checkbox" role="switch" />
                                    Agregar contraseña
                                </label>

                            </fieldset>
                        </div>

                        {optionPassword ?
                            <div className='input-container-options'>

                                <div className='input-container'>
                                    <input value={password} onChange={(e) => setPassword(e.target.value.trim())} type="url" placeholder="Ingrese contraseña" autocomplete="url" aria-invalid={!validatePassword() ? 'true' : ''} aria-describedby="valid-password" />

                                    {
                                        !validatePassword() ?
                                            <small id="valid-password">Ingrese una contraseña de 4 caracteres mínimo</small>
                                            : <></>
                                    }
                                </div>
                            </div>
                            : <></>}
                    </div>
                    <div className='container'>
                        {error ?
                            <dialog open>
                                <article>
                                    <h2>Se produjo un error</h2>
                                    <p>
                                        {error}
                                    </p>

                                    <footer>

                                        <button onClick={() => clearError()}>Ok</button>
                                    </footer>
                                </article>
                            </dialog>

                            : <></>
                        }
                    </div>


                </>

            }



        </div>

    )
}