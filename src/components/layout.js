import Head from 'next/head'
import api from '../util/api'
import { logOut } from '../util/auth';

const Layout = ({title, token, children}) => {
    const signOut = (e) => {
        e.preventDefault();
        api().post('api/logout', {}, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            logOut(token);
        });
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Dashboard here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" href="#" onClick={signOut}>Sign out</a>
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                {children}
            </div>
        </div>
    )
}

export default Layout;