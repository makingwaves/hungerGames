import { connect } from 'react-redux';
import React, { Fragment, FunctionComponent } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ScrollView, Alert } from 'react-native';

import styles from './style';

import { colors } from '@app/config/styles';
import BackButton from '@app/components/BackButton';
import { AppState } from '@app/state/state';
import UserProfileData from './UserProfileData';
import UserProfilePlaceholder from './UserProfilePlaceholder';
import { Profile, AuthSagaActions } from '@app/state/auth/types';

export interface UserProfileProps extends NavigationScreenProps {
    userData: Profile;
    updateUser: (userData: { name: string, description: string }) => void;
};

const UserProfile: FunctionComponent<UserProfileProps> = ({
    userData, updateUser, navigation
}) => {
    const showAlert = () => {
        Alert.alert(
            'Profile update',
            'You have updated your data successfuly',
            [
                { text: 'Ok' }
            ],
            { cancelable: false }
        );
    }

    const saveUserData = (data: { name: string, description: string }) => {
        updateUser(data);
        showAlert();
    };

    return (
        <Fragment>
            <BackButton navigation={navigation} backgroundColor={colors.colorLight} />
            <ScrollView style={styles.userProfileContainer}>
                <UserProfilePlaceholder onReady={!!userData}>
                    <UserProfileData userData={userData} updateUser={saveUserData} />
                </UserProfilePlaceholder>
            </ScrollView>
        </Fragment>
    )
}


const mapStateToProps = (state: AppState) => ({
    userData: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userData: { name: string, description: string }) => dispatch({ type: AuthSagaActions.UPDATE_USER_DATA, userData })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile)
