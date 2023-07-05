import useSWR, {SWRResponse} from "swr";
import axios, {AxiosError} from "axios";

const useUserRoles = (): SWRResponse<PaginationData<UserRoleType> | AxiosError, any> => {
    return useSWR<PaginationData<UserRoleType>| AxiosError>(
        'users-roles',
        (url) => axios.get(url).then(x => x.data).catch(e => e)
    );
}

export default useUserRoles;
