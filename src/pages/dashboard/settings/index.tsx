import React from "react";
import DashboardLayout from "@/layouts/dashboard-layout";
import SettingsTable from "@/components/collections/settings/settings-table";

const SettingsPage = () => {
    return (
        <DashboardLayout title={"Настройки"}>
            <h3>Константы</h3>
            <SettingsTable/>
        </DashboardLayout>
    )
}

export default SettingsPage;
