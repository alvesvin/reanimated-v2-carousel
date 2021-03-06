import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface RatingProps {
  rate: number;
}

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = (props) => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={props.filled ? "red" : "gray"}
    >
      <Path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </Svg>
  );
};

const Rating: React.FC<RatingProps> = (props) => {
  const [rate, setRate] = useState([false, false, false, false, false]);

  useEffect(() => {
    const fillRate = Math.round(props.rate / 2);
    const filled = rate.fill(true, 0, fillRate);

    setRate(filled);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16
      }}
    >
      <Text style={styles.text}>{props.rate.toFixed(1).replace(".", ",")}</Text>

      <View style={{ flexDirection: "row" }}>
        {rate.map((filled, index) => (
          <Star key={index} filled={filled} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Marmelat500Medium",
    marginRight: 8
  }
});

export default Rating;
