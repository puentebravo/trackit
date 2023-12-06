import React from "react";
import { AuthContextType } from "../@types/client";
import { useAuthContext } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";


function BrandBar() {

    const {loggedIn,  handleLogout } = useAuthContext() as AuthContextType
    
    const navigate = useNavigate()

    const signOut = () => {
        handleLogout()
        navigate("/login")
    }

    return (
        <header id="brandBar">
            <h1 id="brandHeader">.solid</h1>
            {loggedIn.loggedIn ?

                <button id="logOutBtn" onClick={signOut}> Log Out </button>
                :
                <></>
            }
        </header>
    )
}

export default BrandBar