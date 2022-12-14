import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import DetailScreen from "./DetailScreen";

const screen = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [collections, setCollections] = useState([]);
  const [walletContent, setWalletContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = () => {
    fetch("https://api-generator.retool.com/j3Iz08/collections")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setCollections(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchWalletContent = () => {
    fetch("https://api-generator.retool.com/jlEsLB/wallet_content")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        let arr = [];

        data.forEach((el) => {
          el.collection_json = JSON.parse(el.collection_json);
        });

        data.forEach((el) => {
          if (!arr.length) {
            arr.push(el.collection_json);
            arr[0].group = [];
            arr[0].group.push(el);
            delete arr[0].group.collection_json;
          } else {
            let status = arr.findIndex(
              (element) => element.id === el.collection_json.id
            );
            if (status === -1) {
              arr.push(el.collection_json);
              arr[arr.length - 1].group = [];
              arr[arr.length - 1].group.push(el);
              delete arr[arr.length - 1].group.collection_json;
            } else {
              arr[status].group.push(el);
              delete arr[status].group.collection_json;
            }
          }
        });
        setWalletContent(arr);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const findCollection = (params) => {
    let getCollection = collections.find((el) => params === el.external_id);
    return getCollection.id;
  };

  useEffect(() => {
    fetchCollections();
    fetchWalletContent();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ padding: 5 }}>
          {loading ? (
            <Loading />
          ) : (
            <FlatList
              data={walletContent}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 5, margin: 5, marginVertical: 10 }}
                  onPress={() =>
                    navigation.navigate("DetailScreen", {
                      detailId: findCollection(item.external_id),
                      collectionGroup: item,
                    })
                  }
                >
                  <View>
                    <ImageBackground
                      source={{ uri: item.banner_image_url }}
                      style={styles.imgBackground}
                    >
                      <View style={styles.nameContainer}>
                      <Image
                        source={{ uri: item.image_url }}
                        style={styles.imgProfile}
                      />
                        <Text
                          style={{
                            fontSize: screen.width * 0.05,
                            opacity: 0.9,
                            textAlign: "center",
                            fontWeight: "500",
                          }}
                        >
                          {item.name}
                        </Text>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 5,
                            paddingHorizontal: 5,
                          }}
                        >
                          <Image
                            source={require("../src/image/nft-token.png")}
                            style={{
                              width: screen.width * 0.05,
                              height: screen.width * 0.05,
                              marginLeft: -25,
                            }}
                          />
                          <Text style={styles.tokenOwned}>
                            {'      '}
                            {item.group.length}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(wallet) => wallet.id}
              style={{
                margin: screen.width * 0.05,
                alignContent: "center",
              }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
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
  imgBackground: {
    height: screen.height * 0.2,
    justifyContent: "center",
  },
  imgProfile: {
    width: screen.width * 0.25,
    height: screen.width * 0.25,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#F2F2F2",
    borderWidth: 4,
    opacity: 2,
  },
  nameContainer: {
    backgroundColor: "#F2F2F2",
    width: "auto",
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 10,
    opacity: 0.8,
    marginTop: 5,
    paddingHorizontal: 5,
    minWidth: screen.width * 0.3,
  },
  tokenOwned: {
    fontSize: screen.width * 0.05,
    opacity: 0.9,
    textAlign: "center",
    fontWeight: "500",
    position: "absolute",
  },
});
