import useSWR, {SWRResponse} from "swr";
import axios, {AxiosError} from "axios";

const useTelegramUser = (userId: string): SWRResponse<any | AxiosError> => {
    return useSWR<any | AxiosError>(
        'telegram/' + userId,
        (url) => axios.get(url).then(x => x.data).catch(e => {
            if (e.response) return e.response.data;
        })
    );
}

export default useTelegramUser;
