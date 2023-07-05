import React from "react";
import LoginCard from "@/components/profile/login-card";
import LoginLayout from "@/layouts/login-layout";

const Login = () => {
    return (
        <LoginLayout title={"Вход"}>
            <LoginCard/>
        </LoginLayout>
    )
}

export default Login
