import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text } from 'react-native';

const InfoItem = ({ size, color, tag, visible }) => {
  const { width, height } = size;

  let str = '';
  if (tag) str += `${tag} • `;
  if (width && height) str += `${parseInt(width)} x ${parseInt(height)}`;

  const moveAwayAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    Animated.timing(moveAwayAnimation, {
      toValue: visible ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.exp)
    }).start();
  }, [visible]);

  if (str) {
    return (
      <Animated.View
        style={[styles.container, { zIndex: 1000, backgroundColor: color, opacity: moveAwayAnimation, transform: [{ scale: moveAwayAnimation }] }]}>
        <Text style={styles.text}>{str}</Text>
      </Animated.View>
    );
  } else {
    return <></>;
  }
};

export default InfoItem;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    padding: 3,
    marginTop: 3,
    marginLeft: 3,
    borderRadius: 2
  },
  text: {
    fontSize: 9,
    color: 'white'
  }
});
