import { StyleSheet } from 'react-native';
import React, { createContext, useRef } from 'react';
import PagerView from 'react-native-pager-view';

import ProfilePage from '../Profile/ProfilePage';
import MatchPage from '../Match/MatchPage';
import FindPage from '../Find/FindPage';

export const MainPageContext = createContext({
    navigationArray: [() => { }],
});

const MainPage: React.FC = () => {
    const ref = useRef<PagerView>(null);
    const navigateToProfile = (): void => {
        ref.current?.setPage(1);
    };
    const navigateToMatch = (): void => {
        ref.current?.setPage(0);
    };
    const navigateToFind = (): void => {
        ref.current?.setPage(2);
    };

    return (
        <MainPageContext.Provider
            value={{
                navigationArray: [navigateToProfile, navigateToMatch, navigateToFind],
            }}
        >
            <PagerView style={styles.pager} ref={ref} initialPage={1}>
                <MatchPage />
                <ProfilePage />
                <FindPage />
            </PagerView>
        </MainPageContext.Provider>
    );
};

export default MainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pager: {
        flex: 1,
        alignSelf: 'stretch',
    },
});
