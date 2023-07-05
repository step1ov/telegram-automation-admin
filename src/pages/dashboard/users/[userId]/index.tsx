import React from "react";
import {useRouter} from "next/router";
import UserLayout from "@/layouts/user-layout";
import UserTable from "@/components/users/user-table";

const UserPage = () => {
    const router = useRouter();
    const { userId } = router.query

    return (
        <UserLayout userId={userId as string}>
            <UserTable userId={userId as string}/>
        </UserLayout>
    )
}

export default UserPage;
