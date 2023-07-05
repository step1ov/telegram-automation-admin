import useSWR, {SWRResponse} from "swr";
import axios, {AxiosError} from "axios";

const useTelegramContacts = (userId: string | null): SWRResponse<any | AxiosError> => {
    return useSWR<any | AxiosError>(
        userId ? 'telegram/' + userId + '/contacts' : null,
        (url) => axios.get(url).then(x => x.data).catch(e => {
            if (e.response) return e.response.data;
        })
    );
}

export default useTelegramContacts;
