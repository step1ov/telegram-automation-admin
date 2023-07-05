import React from "react";
import statusesData from "@/components/users/user-status/statuses-data";

const statusOptions = Object.entries(statusesData)
    .map(([key, value]) =>
        ({ value: key, label: value.text })
    )

export default statusOptions;
