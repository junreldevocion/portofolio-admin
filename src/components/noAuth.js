import { isLoggedIn } from "../util/auth";
import redirectTo from '../util/redirectTo';

export default function noAuth(Component) {
    const NoAuthComponent = (props) => {
        return <Component {...props} />
    }

    NoAuthComponent.getInitialProps = (context) => {
        const isUserLoggIn = isLoggedIn(context?.req?.headers.cookie || '')

        if ( isUserLoggIn.isLoggedIn ) {
            redirectTo('/', context);
        }

        return {user: {isLoggedIn: isUserLoggIn}};
    }

    return NoAuthComponent;
}