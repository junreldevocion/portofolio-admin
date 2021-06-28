import { isLoggedIn } from "../util/auth";
import redirectTo from '../util/redirectTo';

export default function withAuth(Component) {
    const AuthComponent = (props) => {
        return <Component {...props} />
    }

    AuthComponent.getInitialProps = (context) => {
        const isUserLoggIn = isLoggedIn(context?.req?.headers.cookie || '')

        if (! isUserLoggIn ) {
            redirectTo('/login', context);
        }

        return {user: {isLoggedIn: isUserLoggIn}};
    }

    return AuthComponent;
}