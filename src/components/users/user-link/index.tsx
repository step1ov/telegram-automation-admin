import Link from "next/link";
import getUserDisplayText from "@/utils/users/get-user-display-text";

const UserLink = (user: Partial<UserType> | undefined): any  => {
    if (!user) return null;
    return (
        <Link href={`/dashboard/users/${user.id}`}>{getUserDisplayText(user)}</Link>
    )
}

export default UserLink;
