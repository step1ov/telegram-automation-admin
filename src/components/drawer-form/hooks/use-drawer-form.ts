import {useState} from "react";
import {ValidateErrorEntity} from "rc-field-form/es/interface";
import axios from "axios";
import {FormInstance, notification} from "antd";

export interface UseDrawerFormResult {
    open: boolean,
    showDrawer: () => void,
    onClose: () => void,
    onFinish: ((values: any) => void),
    onFinishFailed: ((errorInfo: ValidateErrorEntity<any>) => void) | undefined,
    error: string,
    initialValues: any,
    handleCreate: () => void,
    handleUpdate: (data: any) => void,
    title: string,
    form?: FormInstance
}

export interface UseDrawerFormProps {
    url: string,
    onSaved: (data: any) => void,
    title: string,
    updateTitle?: string,
    postDataTransform?: (data: any) => any,
    preDataTransform?: (data: any) => any,
    initialValues?: any,
    form?: FormInstance
}

const getTitle = (editableObject: any, title: string, updateTitle: string | undefined): string => {
    if (editableObject) {
        return `Редактировать ${updateTitle ? updateTitle : title}`
    }
    return `Создать ${title}`
}

const useDrawerForm = ({url, onSaved, title, updateTitle, postDataTransform, preDataTransform, initialValues, form} : UseDrawerFormProps):
    UseDrawerFormResult => {
    const [open, setOpen] = useState(false);
    const [ error, setError ] = useState('');
    const [ editableObject, setEditableObject ] = useState<object | undefined>(undefined);

    const showDrawer = () => {
        setOpen(true);
        setError('');
    };

    const onClose = () => {
        setOpen(false);
    };

    const getFormData = (values: any) => {
        const data = editableObject ? { ...editableObject, ...values } : values;
        if (postDataTransform && data) {
            return postDataTransform(data)
        }
        return data;
    }

    const onFinish = (values: any) => {
        console.log(getFormData(values));
        axios.post(
            url + (editableObject ? '/update' : '/create'), getFormData(values)).then(response => {
            onClose();
            onSaved(response.data);
            notification.success({
                message: 'Запись сохранена',
                duration: 1
            });
        }).catch((error) => {
            console.error(error);
            setError(error.toString())
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error(errorInfo);
        setError("Ошибка заполнения формы")
    };

    const handleCreate = () => {
        setEditableObject(undefined);
        showDrawer()
    }

    const handleUpdate = (data: any) => {
        setEditableObject({... data});
        showDrawer()
    }

    const getInitialValues = () => {
        if (editableObject) {
            return preDataTransform ? preDataTransform(editableObject) : editableObject;
        }
        if (initialValues) {
            return preDataTransform ? preDataTransform(initialValues) : initialValues;
        }
        return undefined;
    }

    return {
        open,
        showDrawer,
        onClose,
        onFinish,
        onFinishFailed,
        error,
        initialValues: getInitialValues(),
        handleCreate,
        handleUpdate,
        title: getTitle(editableObject, title, updateTitle),
        form
    }
}

export default useDrawerForm;
