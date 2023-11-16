import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

// function SignUpButton() {
//   const clerk = useClerk();

//   return (
//     <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>
//       Sign up
//     </button>
//   );
// }

function SignInButton() {
  const clerk = useClerk();

  return (
    // <button className="sign-in-btn nav-item" onClick={() => clerk.openSignIn({})}>
    //   <h3>Sign in</h3>
    // </button>
    <div className="nav-items">
      <h3>
        {/* <Link className="nav-item" > */}
        <button className="nav-btn" onClick={() => clerk.openSignIn({})}>
          Log in
        </button>

        {/* </Link> */}
      </h3>
    </div>
  );
}

function Header() {
  return (
    <header>
      <nav>
        <div className="logo" onClick={() => (window.location.href = "/")}>
          <h3 className="logo-text1">URL</h3>
          <img src="/logo.png" height={20} className="logo-img"></img>{" "}
          <h3 className="logo-text2">Ninja</h3>
        </div>

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <div className="nav-items">
          <Link to="/short-url" className="nav-item">
              Short-URL
            </Link>
            <Link to="/drive" className="nav-item">
              Drive
            </Link>
          </div>
          <div className="nav-profile">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
}

export default Header;
