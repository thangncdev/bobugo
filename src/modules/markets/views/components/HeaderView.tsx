import React, { ReactNode } from 'react';
import { FlexAlignType, View, ViewProps } from 'react-native';

interface HeaderViewProps extends ViewProps {
    flex: number;
    alignItems: FlexAlignType;
    marginRight?: number;
    children: ReactNode;
}

const HeaderView = (props: HeaderViewProps) => {
    const { flex = 1, alignItems = 'flex-start', marginRight = 0, children } = props;

    return (
        <View style={{ flex, alignItems, marginRight }}>
            {children}
        </View>
    )
};

export default HeaderView;
