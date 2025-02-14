import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import { userActionCreators } from 'modules/user/src/actions';
import { dispatch } from 'utils/dispatcher';

export const onGoogleButtonPress = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        dispatch(userActionCreators.loginWithGG(userInfo?.idToken));
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
    }
};

export const onAppleButtonPress = async () => {
    try {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
            // See: https://github.com/invertase/react-native-apple-authentication#faqs
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned');
        }

        // Create a Firebase credential from the response
        const { identityToken, fullName, email } = appleAuthRequestResponse;
        dispatch(userActionCreators.loginWithApple({
            idtoken: identityToken,
            name: fullName.familyName + fullName.givenName,
            email,
        }));
    } catch (error) {
        // console.log(error)
        // some other error happened
    }
};
