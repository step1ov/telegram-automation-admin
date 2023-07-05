import React from "react";
import {useRouter} from "next/router";
import UserLayout from "@/layouts/user-layout";
import AutomationTable from "@/components/automation/automation-table";

const UserActionsPage = () => {
    const router = useRouter();
    const userId = router.query.userId as string;
    return (
        <UserLayout userId={userId}
                    title={"Telegram"}
                    breadcrumb={{ routes: [
                            { path: "automation", breadcrumbName: "Сценарии" }
                        ]}}
        >
            <AutomationTable userId={userId}/>
        </UserLayout>
    )
}

export default UserActionsPage;
