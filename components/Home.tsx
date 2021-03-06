import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  RefreshControl,
  ListRenderItemInfo,
  Dimensions,
  Image,
  StyleSheet,
  FlatList
} from "react-native";
import Reanimated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useMovies } from "../contexts/movies";
import { Movie } from "../lib/tmdb";
import Rating from "./Rating";

const { width, height } = Dimensions.get("screen");
const MOVIE_ITEM_WIDTH = width * 0.75;
const BACKDROP_HEIGHT = height * 0.55;
const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

interface MoveiItemProps extends ListRenderItemInfo<Movie> {
  scrollX: Reanimated.SharedValue<number>;
}

interface BackdropProps {
  movies: Movie[];
  scrollX: Reanimated.SharedValue<number>;
}

interface BackdropItemProps extends ListRenderItemInfo<Movie> {
  scrollX: Reanimated.SharedValue<number>;
}

const MovieItem: React.FC<MoveiItemProps> = (props) => {
  const inputRange = [
    (props.index - 1) * MOVIE_ITEM_WIDTH,
    props.index * MOVIE_ITEM_WIDTH,
    (props.index + 1) * MOVIE_ITEM_WIDTH
  ];

  const outputRange = [0, -48, 0];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: Reanimated.interpolate(
            props.scrollX.value,
            inputRange,
            outputRange
          )
        }
      ]
    };
  });

  return (
    <Reanimated.View style={[{ width: MOVIE_ITEM_WIDTH }, animatedStyle]}>
      <View style={styles.poster_wrapper}>
        <Image
          source={{ uri: props.item.poster_path }}
          style={[styles.poster_image, { height: height * 0.35 }]}
        />

        <Text numberOfLines={2} style={styles.movie_title}>
          {props.item.title}
        </Text>

        <Rating rate={props.item.vote_average} />

        <Text style={styles.movie_description} numberOfLines={3}>
          {props.item.overview}
        </Text>
      </View>
    </Reanimated.View>
  );
};

const BackdropItem: React.FC<BackdropItemProps> = (props) => {
  const inputRange = [
    (props.index - 1) * MOVIE_ITEM_WIDTH,
    props.index * MOVIE_ITEM_WIDTH
  ];

  const outputRange = [0, width];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: Reanimated.interpolate(
        props.scrollX.value,
        inputRange,
        outputRange
      )
    };
  });

  return (
    <Reanimated.Image
      source={{ uri: props.item.backdrop_path }}
      style={[{ height: BACKDROP_HEIGHT, position: "absolute" }, animatedStyle]}
    />
  );
};

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <View
      style={{
        height: BACKDROP_HEIGHT,
        width,
        position: "absolute",
        backgroundColor: "red"
      }}
    >
      <FlatList
        data={props.movies}
        horizontal={true}
        bounces={false}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={MOVIE_ITEM_WIDTH + 103}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        keyExtractor={({ id }) => id.toString()}
        renderItem={(data) => (
          <BackdropItem {...data} scrollX={props.scrollX} />
        )}
      />

      <LinearGradient
        colors={["transparent", "transparent", "white"]}
        style={{ height: BACKDROP_HEIGHT, width: "100%", position: "absolute" }}
      />
    </View>
  );
};

const Home = () => {
  const [movies, refreshMovies] = useMovies();
  const [refreshing, setRefreshing] = useState(false);
  const scrollX = useSharedValue(0);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refreshMovies();
    setRefreshing(false);
  }, [refreshMovies, setRefreshing]);

  const scrollHandler = useAnimatedScrollHandler((evt) => {
    scrollX.value = evt.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#FFFFFF66" />

      {movies && <Backdrop movies={movies} scrollX={scrollX} />}

      <AnimatedFlatList
        data={movies}
        horizontal={true}
        bounces={false}
        decelerationRate={0}
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={MOVIE_ITEM_WIDTH}
        contentContainerStyle={{
          paddingTop: BACKDROP_HEIGHT / 2,
          paddingHorizontal: MOVIE_ITEM_WIDTH * 0.168
        }}
        renderItem={(props: any) => <MovieItem {...props} scrollX={scrollX} />}
        keyExtractor={({ id }: any) => id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  poster_wrapper: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 32,
    marginHorizontal: 16
  },
  poster_image: {
    borderRadius: 24
  },
  movie_title: {
    fontFamily: "Marmelat500Medium",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 16,
    color: "#3D3D3D"
  },
  movie_description: {
    textAlign: "center",
    color: "#666"
  }
});

export default Home;
