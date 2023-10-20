import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}
// любые массивы и объекты которые передаются пропсами необходимо мемоизировать
const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(({
    className, value, onChange, readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    // приводим к явному типу полученных значений Currency...
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <ListBox
            className={className}
            onChange={onChangeHandler}
            value={value}
            items={options}
            defaultValue={t('Укажите валюту')}
            readonly={readonly}
            direction="top"
            label={t('Укажите валюту')}
        />
    );
});
