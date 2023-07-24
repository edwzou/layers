import { StyleSheet, View, } from 'react-native'
import React, { createContext, useRef } from 'react'
import PagerView from 'react-native-pager-view'

import ProfilePage from '../Profile/ProfilePage'
import MatchPage from '../Match/MatchPage'
import FindPage from '../Find/FindPage'

export const NavigationContext = createContext([() => { }]);

const Main = () => {

    const ref = useRef<PagerView>(null);
    const navigateToProfile = () => {
        ref.current?.setPage(1)
    }
    const navigateToMatch = () => {
        ref.current?.setPage(0)
    }
    const navigateToFind = () => {
        ref.current?.setPage(2)
    }

    return (
        <NavigationContext.Provider value={[navigateToProfile, navigateToMatch, navigateToFind]}>
            <PagerView
                style={styles.pager}
                ref={ref}
                initialPage={1}>
                <View>
                    <MatchPage />
                </View>
                <View>
                    <ProfilePage />
                </View>
                <View>
                    <FindPage />
                </View>
            </ PagerView>
        </NavigationContext.Provider>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pager: {
        flex: 1,
        alignSelf: 'stretch',
    }
})