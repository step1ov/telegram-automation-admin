type UserRoleType = {
    id: string;
    description: string;
    grants: any[];
    isDeleted: boolean;
}

type UserType = {
    id: string,
    email: string,
    username?: string,
    phone?: string
    firstName?: string,
    lastName?: string,
    displayName: string,
    avatar: string,
    dob?: number,
    gender: "male" | "female" | "not_specified"
    region?: string;
    about?: string;
    theme: 'light' | 'dark';
    verification?: {
        email: string;
        phone: string;
    };
    timezone?: number;
    status: 'draft' | 'active' | 'blocked' | 'deleted',
    expoNotificationToken?: string;
    notificationSent?: number;
    fields?: Record<string, any>;
    passwordUpdatedAt?: Date
    role?: UserRoleType
    createdAt: Date
    updatedAt: Date,
    posts?: number,
    comments?: number
}

type UserDataType = {
    access_token: string,
    user?: UserType,
}

type UserChangePasswordDataType = {
    password: string,
    old: string,
    confirm: string
}

type UsersDataType = {
    pagination: Pagination,
    records: UserType[],
}

type UserRestorePasswordValidateType = {
    emailEncrypted: string,
    otp: string,
}

type UserRestorePasswordResetType ={
    emailEncrypted: string,
    otp: string,
    password: string,
    confirm: string,
}

