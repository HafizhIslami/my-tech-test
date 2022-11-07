import { Dimensions, Image, Text, View } from "react-native";

export default function Loading() {
  const screen = Dimensions.get("window");

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={require("../assets/loading.gif")}
          style={{
            width: screen.width / 2,
            height: screen.width / 2,
            alignSelf: "center",
          }}
        />
      </View>
    </>
  );
}
