import { StyleSheet } from 'react-native';
import React, { createContext, useContext, useRef } from 'react';
import PagerView from 'react-native-pager-view';

import ProfilePage from '../Profile/ProfilePage';
import MatchPage from '../Match/MatchPage';
import FindPage from '../Find/FindPage';
import { UserContext } from '../../utils/UserContext';

export const NavigationContext = createContext([() => { }]);

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

    const { data } = useContext(UserContext)

    return (
        <NavigationContext.Provider
            value={[navigateToProfile, navigateToMatch, navigateToFind]}
        >
            <PagerView style={styles.pager} ref={ref} initialPage={1}>
                <MatchPage />
                <ProfilePage />
                <FindPage />
            </PagerView>
        </NavigationContext.Provider>
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
