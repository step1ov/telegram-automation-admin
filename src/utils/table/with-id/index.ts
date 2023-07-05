import {ColumnsType} from "antd/lib/table";
import idColumn from "@/utils/table/with-id/id-column";

const withId = (columns: ColumnsType<any> | any) : ColumnsType<any> => [ idColumn, ...columns ];

export default withId;
