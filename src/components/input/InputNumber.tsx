import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';

import Input, { InputProps, InputRefType } from 'components/input/Input';
import { validateInputNumber } from 'utils/numbers';

interface Props extends InputProps {
    decimal?: number;
    beforeDecimal?: number;
}

const InputNumber = (props: Props, ref: ForwardedRef<InputRefType>) => {
    const _inputRef = useRef<InputRefType>(null);

    useImperativeHandle(ref, () => ({
        focusInput: _inputRef?.current?.focusInput,
    }));

    const handleChangeText = (text: string) => {
        const str = validateInputNumber(text, props.value, props.decimal, props.beforeDecimal);
        props?.onChangeText(str)
    }

    return (
        <Input
            ref={_inputRef}
            {...props}
            keyboardType={'numeric'}
            contextMenuHidden
            value={props.value}
            onChangeText={handleChangeText}
        />
    )
};

export default forwardRef(InputNumber);
