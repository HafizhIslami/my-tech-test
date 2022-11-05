import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Loading from "../components/Loading";
import DetailScreen from "./DetailScreen";

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api-generator.retool.com/jlEsLB/wallet_content")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCollections(data);
      })
      .finally(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Text style={{ fontSize: 50, textAlign: "center" }}>
        Collections Item
      </Text>
      <ScrollView style={{ padding: 5 }}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={collections}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ padding: 5, margin: 5 }}
                onPress={() =>
                  navigation.navigate("DetailScreen", { detailId: item.id })
                }
              >
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(wallet) => wallet.id}
            numColumns={2}
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: "green",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
