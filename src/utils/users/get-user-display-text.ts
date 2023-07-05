const getUserDisplayText = (user: Partial<UserType> | undefined) => {
    if (!user) return '';
    const { id, displayName, email, username } = user;
    // let name = '';
    // let hasName = false;
    // if (displayName) {
    //     name = displayName;
    //     hasName = true;
    // }
    // if (email || username) {
    //     if (hasName) name += ' (';
    //     if (email) {
    //         name += email;
    //         if (username) {
    //             name += ', @' + username;
    //         }
    //     } else {
    //         name += '@' + username;
    //     }
    //     if (hasName) name += ')';
    // }
    // if (!name && id) name = id.toString();
    // return name;
    return username ? username : id;
}

export default getUserDisplayText;
