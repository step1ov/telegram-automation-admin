import React from "react";
import gendersData from "@/components/users/user-gender/genders-data";

const genderOptions = Object.entries(gendersData)
    .map(([key, value]) =>
        ({ value: key, label: value.text })
    )

export default genderOptions;
