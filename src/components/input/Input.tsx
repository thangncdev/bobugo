import React, { ForwardedRef, forwardRef, ReactElement, useImperativeHandle, useRef } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from 'components/base';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

export interface InputProps extends TextInputProps {
    icon?: ReactElement;
    displayErrorOnField?: boolean;
    errorMessage?: string;
    onPressIcon?: () => void;
    inputContainerStyles?: StyleProp<ViewStyle>;
    inputStyles?: StyleProp<TextStyle>;
}

export interface InputRefType {
    focusInput: () => void;
}

const Input = (props: InputProps, ref: ForwardedRef<InputRefType>) => {
    const { icon, displayErrorOnField = false, errorMessage, onPressIcon, inputContainerStyles, inputStyles } = props;

    const _inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
        focusInput,
    }));

    const focusInput = () => _inputRef?.current?.focus();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                style={[
                    styles.inputContainer,
                    inputContainerStyles,
                    errorMessage || displayErrorOnField ? { borderColor: Colors.color_CC0A00 } : {},
                ]}
            >
                <TextInput
                    ref={_inputRef}
                    style={[
                        styles.input,
                        inputStyles,
                        displayErrorOnField ? { color: Colors.color_CC0A00 } : {},
                    ]}
                    placeholderTextColor={displayErrorOnField ? Colors.color_CC0A00 : Colors.color_A2A4AA}
                    {...props}
                />
                {icon ? (
                    <TouchableOpacity onPress={onPressIcon}>
                        {icon}
                    </TouchableOpacity>
                ) : null}
            </TouchableOpacity>
            {errorMessage ? (
                <Text style={styles.errorText}>
                    {errorMessage}
                </Text>
            ) : null}
        </View>
    );
};

export default forwardRef(Input);

const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scales(48),
        borderRadius: scales(5),
        borderWidth: scales(1),
        borderColor: Colors.color_5E626F,
        paddingRight: scales(16),
    },
    input: {
        flex: 1,
        height: scales(48),
        paddingHorizontal: scales(16),
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_090F24,
    },
    errorText: {
        ...Fonts.w400,
        paddingTop: scales(8),
        color: Colors.color_CC0A00,
        fontSize: scales(12),
        paddingLeft: scales(1),
    },
});
