import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Masonry from "react-native-virtualized-masonry";
import { asyncGetItems, getItems } from "./apiMock";

type T = ReturnType<typeof getItems>;

const gutter = 10;
const numColumns = 2;

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>([]);

  const refresh = useCallback(async () => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);
    const res = await asyncGetItems();
    setData(res);
    setRefreshing(false);
  }, [refreshing]);

  const loadmore = useCallback(async () => {
    if (loading) {
      return;
    }
    console.log("loadmore", data.length);
    setLoading(true);
    const res = await asyncGetItems();
    setLoading(false);
    setData([...data, ...res]);
  }, [loading, data]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Masonry
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                backgroundColor: item.color,
                borderRadius: 10,
                aspectRatio: item.aspectRatio,
              }}
              onPress={() => Alert.alert(item.id)}
            >
              <Text>
                {index} - {item.aspectRatio}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          gutter={gutter}
          numColumns={numColumns}
          width={Dimensions.get("screen").width}
          getBrickHeight={(item, brickWidth) =>
            (brickWidth || 0) / item.aspectRatio
          }
          style={{ height: 100 }}
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReached={loadmore}
          ListHeaderComponent={
            <View
              style={{
                padding: 15,
                borderBottomColor: "#000",
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 16, fontWeight: "500" }}
              >
                Virtualized Masonry Demo
              </Text>
            </View>
          }
          ListFooterComponent={
            loading ? (
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator />
                <Text style={{ marginLeft: 10, color: "#333" }}>
                  loading...
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}
