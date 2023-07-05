import {SorterResult} from "antd/es/table/interface";
import {Key} from "react";

export interface SorterData {
    sortField: string,
    sortOrder: 'asc' | 'desc',
}

const getSorterField = (field: Key | readonly Key[]): string => {
    if (Array.isArray(field)) {
        return field.join('_');
    }
    return field.toString();
}


const getSorterData = (sorter: SorterResult<any> | SorterResult<any>[]) : SorterData | undefined => {
    if (sorter) {
        if (Array.isArray(sorter)) {
            if (sorter.length > 0 && sorter[0].field) {
                return {
                    sortField: getSorterField(sorter[0].field),
                    sortOrder: sorter[0].order === 'ascend' ? 'asc' : 'desc'
                }
            }
        } else if (sorter.field) {
            return {
                sortField: getSorterField(sorter.field),
                sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc'
            }
        }
    }
    return undefined
}

export default getSorterData;
