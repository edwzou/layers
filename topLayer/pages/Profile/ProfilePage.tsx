import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native';

import Navbar from '../../components/Bar/Navbar';
import GeneralModal, { refPropType } from '../../components/Modal/GeneralModal';

import { StepOverTypes, StackNavigation } from '../../constants/Enums';

import { highTranslateY } from '../../utils/modalMaxShow';

import Profile from './Profile'
import FeedbackPage from '../../ModalContent/Feedback/FeedbackPage';

const ProfilePage = () => {

    const modalRef = useRef<refPropType>(null);

    const toggleFeedbackModal = () => {
        modalRef.current?.scrollTo(highTranslateY);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navbar toggleFeedbackModal={toggleFeedbackModal} />
            <Profile isForeignProfile={false} />
            <GeneralModal
                title={StackNavigation.Feedback}
                stepOver={{ type: StepOverTypes.send, handlePress: () => { } }}
                content={<FeedbackPage />}
                ref={modalRef}
            />
        </SafeAreaView>
    );
};

export default ProfilePage;
