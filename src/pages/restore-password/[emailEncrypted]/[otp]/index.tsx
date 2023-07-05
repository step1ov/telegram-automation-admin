import React from "react";
import LoginLayout from "@/layouts/login-layout";
import {useRouter} from "next/router";
import RestorePasswordCard from "@/components/profile/restore-password-card";

const PasswordRestorePage = () => {
    const router = useRouter();
    const { emailEncrypted, otp } = router.query;
    return (
        <LoginLayout title={"Восстановление пароля"}>
            <RestorePasswordCard emailEncrypted={emailEncrypted as string} otp={otp as string}/>
        </LoginLayout>
    )
}

export default PasswordRestorePage
