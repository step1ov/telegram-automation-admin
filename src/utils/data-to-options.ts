import {AxiosError} from "axios";

const dataToOptions = (data: PaginationData<any> | AxiosError | undefined, displayField = 'title') => data && 'records' in data ?
    data.records
        .map(x => ({ value: x.id, label: x[displayField] }))
        .sort((a, b) => a.label.localeCompare(b.label)) :
    [];

export default dataToOptions;
