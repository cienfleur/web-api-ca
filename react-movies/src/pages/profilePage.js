import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

const ProfilePage = (props) => {
    const context = useContext(AuthContext);

    return context.isAuthenticated ? (
        <h2>Hello, {context.userName} <button onClick={() => context.signout()}>Sign out</button> </h2>
    ) : (
        <h2>How did you get here?</h2>
    );
}

export default ProfilePage;