import {
	View,
	StyleSheet,
	FlatList,
	TextInput,
	Text,
	Pressable,
	ActivityIndicator,
	RefreshControl,
	TouchableOpacity,
} from "react-native";
import {
	responsiveFontSize,
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getFollowers } from "../api/community";
import { useFocusEffect } from "@react-navigation/native";

interface ProfileFollowersScreenProps {
	route: any;
	navigation: any;
}

const ProfileFollowersScreen: React.FC<ProfileFollowersScreenProps> = ({
	route,
	navigation,
}) => {
	const { userID } = route.params;

	const [fullyLoaded, setFullyLoaded] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [renderSearch, setRenderSearch] = useState(false);

	const navigateToProfile = (user_id: number) => {
		navigation.navigate("ProfileScreen", { userID: user_id });
	};

	const fetchFollowers = useCallback(() => {
		getFollowers(userID)
			.then((data) => {
				console.log(data);
				if (!data) {
					setRenderSearch(false);
					setFullyLoaded(true);
				}
				setSearchResults(data);
				setRenderSearch(true);
				setFullyLoaded(true);
			})
			.catch((error) => {
				setRenderSearch(false);
				setFullyLoaded(false);
				console.error("Error: ", error);
			});
	}, [userID]);
	useFocusEffect(fetchFollowers);

	if (!fullyLoaded) {
		return (
			<View
				style={{
					alignContent: "flex-start",
					paddingTop: responsiveHeight(10),
				}}
			>
				<ActivityIndicator size={"large"} color={"lightblue"} />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<View
				style={{
					height: responsiveHeight(5),
					width: responsiveWidth(100),
					backgroundColor: "lightblue",
					paddingStart: responsiveWidth(1),
					flexDirection: "row",
				}}
			>
				<TouchableOpacity
					style={{
						height: responsiveHeight(4.5),
						width: responsiveHeight(6),
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "transparent",
					}}
					onPress={() => navigation.goBack()}
				>
					<Icon
						size={responsiveHeight(4.2)}
						color={"black"}
						name={"arrow-back"}
					></Icon>
				</TouchableOpacity>
				<Text
					style={{
						height: responsiveHeight(4.5),
						fontSize: responsiveFontSize(3),
						fontWeight: "bold",
						paddingStart: responsiveWidth(1),
					}}
				>
					Followers
				</Text>
			</View>
			<View style={{}}>
				{renderSearch && (
					<FlatList
						style={[{ width: responsiveWidth(100) }]}
						data={searchResults}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={!fullyLoaded}
								onRefresh={fetchFollowers}
							/>
						}
						ListHeaderComponent={<></>}
						renderItem={({ item }) => (
							<>
								<View
									style={{
										flex: 1,
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "center",
										paddingTop: responsiveHeight(1),
									}}
								>
									<Pressable
										onPressOut={() =>
											navigateToProfile((item as { user_id: number }).user_id)
										}
										style={({ pressed }) => [
											{
												backgroundColor: pressed ? "lightgrey" : "white",
											},
											{
												flexDirection: "row",
												paddingVertical: responsiveHeight(0.5),
												paddingHorizontal: responsiveWidth(3),
												borderRadius: 5,
												width: responsiveWidth(100),
											},
										]}
									>
										{/* temp For Profile Picture */}
										<View
											style={{
												height: responsiveHeight(5),
												width: responsiveHeight(5),
												borderRadius: 50,
												backgroundColor: "lightblue",
											}}
										></View>

										<View
											style={{
												maxWidth: responsiveWidth(80),
												backgroundColor: "transparent",
												flexDirection: "column",
											}}
										>
											<Text
												style={{
													paddingStart: responsiveWidth(2),
													maxWidth: responsiveWidth(80),
													backgroundColor: "transparent",
													verticalAlign: "top",
												}}
												numberOfLines={1}
												ellipsizeMode="tail"
											>
												{
													(item as { first_name: string; last_name: string })
														.first_name
												}{" "}
												{
													(item as { first_name: string; last_name: string })
														.last_name
												}
											</Text>
											{/* 
                                    Next item will appear under of name.
                                */}
										</View>
										{/* 
                                Next item will appear right of name.
                                Don't
                            */}
									</Pressable>
								</View>
							</>
						)}
					></FlatList>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		backgroundColor: "white",
		flexDirection: "column",
	},
});

export default ProfileFollowersScreen;
