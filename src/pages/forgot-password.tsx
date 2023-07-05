import React from "react";
import LoginLayout from "@/layouts/login-layout";
import ForgotPasswordCard from "@/components/profile/forgot-password-card";

const ForgotPassword = () => {
    return (
        <LoginLayout title={"Забыли пароль"}>
            <ForgotPasswordCard/>
        </LoginLayout>
    )
}

export default ForgotPassword
