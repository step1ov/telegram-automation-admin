const formatTgUser = (user: Partial<TelegramUser>): string => {
    let res = user.first_name ? user.first_name: "";
    if (user.last_name) {
        res += res ? " " + user.last_name : user.last_name;
    }
    if (user.username){
        if (res) res += " ";
        res += `(@${user.username})`;
    }
    return res;
}

export default formatTgUser;
