import React from 'react';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import scales from 'utils/scales';

interface CheckboxProps {
    disabled?: boolean;
    value: boolean;
    onToggle: () => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { disabled = false, onToggle, value = false } = props;

    return (
        <TouchableOpacity
            onPress={onToggle}
            disabled={disabled}
        >
            {value ? (
                <Svgs.IcCheckBoxSelected width={scales(16)} height={scales(16)} />
            ) : (
                <Svgs.IcCheckBox width={scales(16)} height={scales(16)} />
            )}

        </TouchableOpacity>
    );
};

export default Checkbox;
