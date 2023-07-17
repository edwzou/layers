import React, { useRef } from 'react';
import { View } from 'react-native';
import Navbar from '../../components/Bar/Navbar';
import FeedbackPage from '../Feedback/FeedbackPage';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';
import Profile from './Profile'
import { StepOverTypes, StackNavigation } from '../../constants/Enums';
import { maxTranslateY } from '../../utils/modalMaxShow';

const ProfilePage = () => {

    const modalRef = useRef<refPropType>(null);

    const toggleFeedbackModal = () => {
        modalRef.current?.scrollTo(maxTranslateY);
    };

    return (
        <View style={{ flex: 1 }}>
            <Navbar toggleFeedbackModal={toggleFeedbackModal} />
            <Profile />
            <GeneralModal
                title={StackNavigation.Feedback}
                stepOver={{ type: StepOverTypes.send, handlePress: () => { } }}
                content={<FeedbackPage />}
                ref={modalRef}
            />
        </View>
    );
};

export default ProfilePage;
