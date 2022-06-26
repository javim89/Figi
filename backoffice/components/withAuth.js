import { useSession, signIn, signOut } from "next-auth/react"
import LogIn from "../pages/login";

const withAuth = Component => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { data: session } = useSession()
    // If user is not logged in, return login component
    if (!session) {
      return (
        <LogIn />
      );
    }
    // If user is logged in, return original component
    return (
        <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;