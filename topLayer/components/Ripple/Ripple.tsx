import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { PropsWithChildren, ReactNode } from 'react'

type RipplePropsType = {
    style?: StyleProp<ViewStyle>
    onTap?: () => void
}

const Ripple: React.FC = ({ style, onTap }: RipplePropsType, { children }: PropsWithChildren) => {
    return (
        <View style={style}>
            {children}
        </View>
    )
}

export default Ripple

const styles = StyleSheet.create({})