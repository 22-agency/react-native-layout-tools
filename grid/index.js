import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Grid = ({ size = 20, opacity = 0.1 }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const lines = Math.ceil(containerHeight / size);
  const rows = Math.ceil(containerWidth / size);

  const onLayout = useCallback((e) => {
    const { height, width } = e.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
  });

  const renderLines = () => {
    const lineArray = new Array(lines).fill('*');
    const rowArray = new Array(rows).fill('*');

    return (
      <View style={[styles.lineContainer, styles.verticalContainer]}>
        {lineArray.map((item, lineIndex) => (
          <View key={lineIndex} style={{ flexDirection: 'row' }}>
            {rowArray.map((item, itemIndex) => (
              <View
                key={`${lineIndex}${itemIndex}`}
                style={[styles.line, { opacity, width: size, height: size }]}></View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View onLayout={onLayout} style={styles.container}>
      {renderLines()}
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
  },
  outerContainer: {
    height: '100%',
    width: '100%',
  },
  lineContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  horizontalContainer: {
    flexDirection: 'column',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  line: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
  },
  verticalLine: {
    width: 1,
    height: '100%',
  },
});
