import LoginForm from "../components/login/LoginForm";
import useRedirectHome from "../hooks/useRedirectHome";

export default function Login() {
  // Hooks
  // Redirect to home if already logged in...
  useRedirectHome();

  return (
    <>
      <LoginForm />
    </>
  );
}
