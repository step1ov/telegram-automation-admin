import {ColumnsType} from "antd/lib/table";

const getVisibleColumns = (columns: ColumnsType<any>, key: string) : Record<string, boolean> => {

    // @ts-ignore
    const res: Record<string, boolean> = columns.reduce((acc, v) => ({ ...acc, [v.key as string]: !v.hidden}), {})
    const dataString = localStorage.getItem(`visible-columns-${key}`);
    if (dataString) {
        try {
            const data = JSON.parse(dataString);
            const keys = Object.keys(res);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (data[key] !== undefined) {
                    // @ts-ignore
                    res[key] = !!data[key];
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
    return res;
}

export default getVisibleColumns;
