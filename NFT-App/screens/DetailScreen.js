import { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  SectionList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Loading from "../components/Loading";

const screen = Dimensions.get("screen");

export default function DetailScreen({ route }) {
  console.log(route.params);
  const { detailId, collectionGroup } = route.params;
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(collectionGroup);
  const [stats, setStats] = useState({});

  const fetchCollectionStats = (id) => {
    fetch(
      `https://api-generator.retool.com/ELI42D/collection_stats?collection_id=${id}`
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setStats(data);
      })
      .finally(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCollectionStats(detailId);
  }, []);

  const chartColor = "hsl(" + Math.floor(Math.random() * 361) + ", 92%, 43%)";

  const decimalNum = (num) => {
    return Number(num).toFixed(2);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <ImageBackground
              source={{ uri: detail.banner_image_url }}
              style={{ height: screen.height * 0.2, justifyContent: "center" }}
            >
              <Image
                source={{ uri: detail.image_url }}
                style={{
                  height: screen.width * 0.25,
                  width: screen.width * 0.25,
                  alignSelf: "center",
                  borderRadius: 10,
                  borderColor: "#F2F2F2",
                  borderWidth: 4,
                  opacity: 2,
                }}
              />
              <View
                style={{
                  backgroundColor: "#F2F2F2",
                  width: "auto",
                  alignSelf: "center",
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  opacity: 0.8,
                  marginTop: 5,
                  minWidth: screen.width * 0.3,
                }}
              >
                <Text
                  style={{
                    fontSize: screen.width * 0.05,
                    marginVertical: 5,
                    opacity: 0.9,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {detail.name}
                </Text>
              </View>
            </ImageBackground>
            <View style={styles.detailContainer}>
              <View>
                <Text style={styles.text}>TOKEN</Text>
                <Text style={styles.text}>{detail.group.length}</Text>
              </View>
              <View>
                <Text style={styles.text}>TOTAL VOLUME</Text>
                <Text style={styles.text}>
                  {decimalNum(detail.total_volume)}
                </Text>
              </View>
              <View>
                <Text style={styles.text}>1 Day</Text>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 5,
                    paddingHorizontal: 5,
                  }}
                >
                  {decimalNum(detail.one_day_change) < 0 ? (
                    <Image
                      source={require("../assets/down.png")}
                      style={{
                        width: screen.width * 0.037,
                        height: screen.width * 0.025,
                        marginLeft: -(screen.width * 0.1),
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/up.png")}
                      style={{
                        width: screen.width * 0.035,
                        height: screen.width * 0.038,
                        transform: [{ rotate: "90deg" }],
                        marginLeft: -(screen.width * 0.1),
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: screen.width * 0.04,
                      opacity: 0.6,
                      fontWeight: "500",
                      textAlign: "center",
                      position: "absolute",
                      marginLeft: screen.width * 0.06,
                    }}
                  >
                    {decimalNum(detail.one_day_change)}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Stats - 30D</Text>
              <LineChart
                data={{
                  datasets: [
                    {
                      data: stats.map((el) => el.floor_price_eth),
                    },
                  ],
                }}
                width={screen.width * 0.95} // from react-native
                height={screen.height * 0.1}
                chartConfig={{
                  backgroundGradientFrom: "#ffffff",
                  backgroundGradientTo: "#ffffff",
                  color: (opacity = 1) => chartColor,
                  fillShadowGradientFrom: chartColor,
                  fillShadowGradientTo: "#ffffff",
                  style: {
                    paddingLeft: 0,
                  },

                  propsForBackgroundLines: {
                    stroke: "#ffffff",
                  },
                }}
                fromZero
                bezier
                withInnerLines={false}
                withHorizontalLabels={false}
                withOuterLines={false}
                withDots={false}
                style={styles.lineChart}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.text}>Collection Token</Text>
              <FlatList
                data={detail.group}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ padding: 5 }}>
                    <ImageBackground
                      source={{ uri: item.image_url }}
                      style={styles.imgBackground}
                    >
                      <Text style={styles.tokenId}>{item.token_id}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
                keyExtractor={(wallet) => wallet.id}
                numColumns={2}
                style={{
                  margin: screen.width * 0.1,
                  alignSelf: "center",
                }}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
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
  lineChart: {
    alignSelf: "center",
    padding: 5,
    paddingVertical: 10,
    marginLeft: -(screen.width * 0.16),
  },
  text: {
    fontSize: screen.width * 0.04,
    opacity: 0.6,
    fontWeight: "500",
    textAlign: "center",
  },
  tokenId: {
    fontSize: screen.width * 0.05,
    opacity: 0.7,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    alignSelf: "baseline",
    backgroundColor: "#ffffff",
  },
  imgBackground: {
    width: screen.width * 0.35,
    height: screen.width * 0.35,
    alignSelf: "center",
    borderRadius: 10,
    borderColor: "#ffffff",
    borderWidth: 4,
  },
  detailContainer: {
    borderWidth: 2,
    backgroundColor: `hsl(${Math.floor(Math.random() * 361)}, 12%, 92%)`,
    borderRadius: 10,
    borderColor: "white",
    marginVertical: screen.height * 0.03,
    width: screen.width * 0.9,
    alignSelf: "center",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-evenly",
  },
});
