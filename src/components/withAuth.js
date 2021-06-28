import { isLoggedIn } from "../util/auth";
import redirectTo from '../util/redirectTo';

export default function withAuth(Component) {
    const AuthComponent = (props) => {
        return <Component {...props} />
    }

    AuthComponent.getInitialProps = (context) => {
        const cookie = isLoggedIn(context?.req?.headers.cookie || '')

        if (! cookie.isLoggedIn ) {
            redirectTo('/login', context);
        }

        return {
            user: cookie,
        };
    }

    return AuthComponent;
}