import {ColumnsType} from "antd/lib/table";
import userColumn from "@/utils/table/with-user/user-column";

const withUser= (columns: ColumnsType<any>, title?: string) : ColumnsType<any> =>
    title ? [ { ...userColumn, title }, ...columns ] : [ userColumn, ...columns ];

export default withUser;
