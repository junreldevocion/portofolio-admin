import { useState } from 'react';
import Head from 'next/head';
import Styles from '../../styles/Login.module.css';
import api from '../../util/api';
import {logIn} from '../../util/auth';
import noAuth from '../../components/noAuth';

const LoginPage = () => {
    const [formInput, setFormInput] = useState({email: '', password: ''});

    const updateFormInput = (e) => {
        e.persist();
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const signIn = (e) => {
        e.preventDefault();
        api().get('/sanctum/csrf-cookie').then(() => {
            api().post('api/login', formInput).then(response => {
                console.log(response);
                logIn(response.data.token);
            });
        });
    }

    return (
    <div>
        <Head>
            <title>Login</title>
            <meta name="description" content="Sign in here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="d-flex justify-content-center align-items-center min-vh-100 text-center">
            <div className={`${Styles.form_signin}`}>
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" name="email" required id="floatingInput" placeholder="name@example.com" onChange={updateFormInput} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" name="password" id="floatingPassword" placeholder="Password" onChange={updateFormInput} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button name="login" className="w-100 btn btn-lg btn-primary" type="submit" onClick={signIn}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </div>
        </div>
    </div>
    );
}

export default noAuth(LoginPage);