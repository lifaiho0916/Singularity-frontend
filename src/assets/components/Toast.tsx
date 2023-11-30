import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Toast } from 'primereact/toast';
import type { RootState } from 'src/store';
import { unnotify } from 'src/store/slices/toastSlice';

const ToastContainer = () => {
    const { show, type, content, title, life } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();
    const toast = React.useRef<Toast | null>(null);

    React.useEffect(() => {
        if (toast.current) {
            if (show) {
                toast.current.show({
                    severity: type,
                    summary: title,
                    detail: content,
                    life: life
                });
                dispatch(unnotify());
            }
        }
    }, [show, type, title, content, life, dispatch]);

    return <Toast ref={toast} position="top-center" />
}

export default ToastContainer;