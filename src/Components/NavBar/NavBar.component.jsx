import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/user.context";
import { className } from "postcss-selector-parser";

const NavBar = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.querySelector("body").setAttribute("data-theme", "dark");
        } else {
            document.querySelector("body").setAttribute("data-theme", "light");
        }
    }, [darkMode])

    return (
        <Fragment>
            <div className="navbar inline-flex gap-3 items-center w-full justify-between font-sans font-bold pt-2">
  <div className="flex items-center">
    <img src="logo.svg" alt="Logo" width="65" style={{ marginRight: '8px' }} />
    <h6 style={{ margin: '0'}}>Nexus</h6>
  </div>

  <div className="flex items-center">
    <button onClick={() => setDarkMode((e) => !e)}>
      <img src={darkMode ? "lightmode.png" : "darkmode.png"} alt="Toggle Modes" width="200" />
    </button>
    <Link to="/">
      <div className={"nav-item" + (location.pathname === "/" ? " active" : "")}>Home</div>
    </Link>
    {user && (
      <Link to="/Dashboard">
        <div className={"nav-item" + (location.pathname === "/Dashboard" ? " active" : "")}>Dashboard</div>
      </Link>
    )}
    {user && (
      <Link to="/AI_Assistant">
        <div className={"nav-item" + (location.pathname === "/AI_Assistant" ? " active" : "")}>AI.Assistant</div>
      </Link>
    )}
    <Link to="/Cryptos">
      <div className={"nav-item" + (location.pathname.includes("/Cryptos") ? " active" : "")}>Cryptocurrencies</div>
    </Link>
    {user ? (
      <Link to="/Profile">
        <img className="rounded-xl" src={user.photoURL} width={40} />
      </Link>
    ) : (
      <Link to="/Auth">
        <div className={"nav-item" + (location.pathname === "/Auth" ? " active" : "")}>Login/signup</div>
      </Link>
    )}
  </div>
</div>
        </Fragment>
    )
}

export default NavBar;