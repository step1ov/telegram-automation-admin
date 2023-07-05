import useSWR, {SWRResponse} from "swr";
import axios, {AxiosError} from "axios";

const useUser = (userId: string): SWRResponse<UserType | AxiosError, any> => {
    return useSWR<UserType| AxiosError>(
        'users/' + userId,
        (url) => axios.get(url).then(x => x.data).catch(e => e)
    );
}

export default useUser;
