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
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Loading from "../components/Loading";

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

export default function DetailScreen({ route }) {
  // console.log(route.params);
  const { detailId } = route.params;
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const [stats, setStats] = useState({});

  const fetchCollectionDetail = (id) => {
    fetch(`https://api-generator.retool.com/j3Iz08/collections/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCollectionStats = (id) => {
    fetch(
      `https://api-generator.retool.com/ELI42D/collection_stats?collection_id=${id}`
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        console.log(data.map((data) => +data.floor_price_eth));

        setStats(data);
      })
      .finally(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCollectionDetail(detailId);
    fetchCollectionStats(detailId);
  }, []);

  return (
    <>
      {/* <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView> */}
      <Text>Ini Detail</Text>

      <View>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <ImageBackground
              source={{ uri: detail.banner_image_url }}
              style={{}}
            >
              <Image
                source={{ uri: detail.image_url }}
                style={{
                  height: 100,
                  width: 100,
                  alignSelf: "center",
                  borderRadius: 10,
                  borderColor: "#F2F2F2",
                  borderWidth: 4,
                  marginTop: 50,
                  marginBottom: -50,
                  opacity: 2,
                }}
              />
            </ImageBackground>
            <View>
              <View>
                <Text>Total Num of Token</Text>
                <Text>-</Text>
              </View>
              <View>
                <Text>Total Volume</Text>
                <Text>{detail.total_volume}</Text>
              </View>
              <View>
                <Text>1 Day</Text>
                <Text>{detail.one_day_change}</Text>
              </View>
            </View>
            <Text>-------------------------------</Text>
            {/* <Text>{stats}</Text> */}
            <LineChart
              data={{
                labels: [
                  "Januari",
                  "Februari",
                  "Maret",
                  "April",
                  "Mei",
                  "Juni",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 50} // from react-native
              height={220}
              yAxisLabel={"Rp"}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: 'center'
              }}
              withDots
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
