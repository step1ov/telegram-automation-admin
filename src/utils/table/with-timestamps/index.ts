import {ColumnsType} from "antd/lib/table";
import timestampsColumns from "@/utils/table/with-timestamps/timestamps-columns";

export interface WithTimestampsOptions {
    hideCreated?: boolean,
    hideUpdated?: boolean
}

const withTimestamps = (columns: ColumnsType<any>, options?: WithTimestampsOptions) : ColumnsType<any> => {
    let _timestampsColumns = timestampsColumns.map(x => ({...x}));
    if (options) {
        if (options.hideCreated) _timestampsColumns[0].hidden = true;
        if (options.hideUpdated) _timestampsColumns[1].hidden = true;
    }
    return columns.concat(_timestampsColumns)
}

export default withTimestamps;
