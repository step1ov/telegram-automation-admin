import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import UsersTable from "@/components/users/users-table";

const UsersPage = () => {
    return (
        <DashboardLayout title={"Пользователи"}
                         breadcrumb={{ routes: [
                                 { path: "users", breadcrumbName: "Пользователи" },
                             ]}}
        >
            <UsersTable/>
        </DashboardLayout>
    )
}

export default UsersPage;
