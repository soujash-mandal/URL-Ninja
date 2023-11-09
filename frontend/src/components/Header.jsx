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
        <Link className="nav-item" onClick={() => clerk.openSignIn({})}>
          Log in
        </Link>
      </h3>
    </div>
  );
}

function Header() {
  return (
    <header>
      <nav>
        <div className="logo" onClick={() => (window.location.href = "/")}>
          <h2 className="logo-text">
            URL - SHORTENER
          </h2>
          
        </div>
        

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          {/* <div className="nav-items">
            <h3>
              <Link to="/create" className="nav-item">
                create
              </Link>
            </h3>
          </div> */}
          <div className="nav-profile">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
}

export default Header;
