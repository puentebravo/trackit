import React from "react";
import { AuthContextType } from "../@types/client";
import { useAuthContext } from "../utils/AuthContext";
import { useNavigate, Link } from "react-router-dom";


function BrandBar() {

    const { loggedIn, handleLogout } = useAuthContext() as AuthContextType

    const navigate = useNavigate()

    const signOut = () => {
        handleLogout()
        navigate("/login")
    }

    return (
        <header id="brandBar">
            <Link to="/"> <h1 id="brandHeader">.TrackIt</h1></Link>
            {loggedIn.loggedIn ?

                <button id="logOutLnk" onClick={signOut}> Log Out </button>
                :
                <></>
            }
        </header>
    )
}

export default BrandBar