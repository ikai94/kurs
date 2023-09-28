import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    // условие для удаления компонента
    removeAfterUnmount?: boolean;
}

// переиспользуемый компонент для асинхронных редьюсеров
export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    // добавляем асинхронный редьюсер менеджер в момомент монтирования компонента, а после этого очищаем когда он уже становится не нужен.
    useEffect(() => {
        // при помощи Object.entries проходим по массиву редьюсер и при помощи деструктуризации достаем из кортежа необходимые аргументы, их типизируем.
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            // добавление рандомного экшена для ослеживания начала монтирования редьюсера
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    // добавление рандомного экшена для ослеживания конца монтирования редьюсера
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line
        <>
            {children}
        </>
    );
};
