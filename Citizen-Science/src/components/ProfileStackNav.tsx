import React from "react";

import ProfileScreen from "../screens/ProfileScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileFollowersScreen from "../screens/ProfileFollowersScreen";
import ProfileFollowingScreen from "../screens/ProfileFollowingScreen";

const Stack = createNativeStackNavigator();
const ProfileStackNavigator = ({ ...props }) => {
	return (
		<Stack.Navigator
			initialRouteName={"ProfileScreen"}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name="ProfileScreen"
				initialParams={{ userID: props.userID }}
				component={ProfileScreen}
			/>
			<Stack.Screen
				name="ProfileEditScreen"
				initialParams={{ userID: props.userID }}
				component={ProfileEditScreen}
			/>
			<Stack.Screen
				name="ProfileFollowersScreen"
				initialParams={{ userID: props.userID }}
				component={ProfileFollowersScreen}
			></Stack.Screen>
			<Stack.Screen
				name="ProfileFollowingScreen"
				initialParams={{ userID: props.userID }}
				component={ProfileFollowingScreen}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

export default ProfileStackNavigator;