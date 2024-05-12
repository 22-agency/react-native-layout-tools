import React, { Children, cloneElement, isValidElement, useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Grid from './grid';
import InfoItem from './info';

const LayoutInspector = ({ children, grid, gridOptions }) => {
  const [borderedChildren, setBorderedChildren] = useState([]);

  useEffect(() => {
    setBorderedChildren(iterateOverChildren(children, {}));
  }, [children]);

  const renderGrid = () => !!grid && <Grid {...gridOptions} />;

  return (
    <>
      {renderGrid()}
      {borderedChildren}
    </>
  );
};

const Container = ({ children, tag, color, childProps }) => {
  const [size, setSize] = useState({});
  const [showInfo, setShowInfo] = useState(false);

  const onContainerLayout = useCallback((e) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  });

  const renderBorders = () => {
    return <View style={{ borderWidth: 2, borderColor: color, ...StyleSheet.absoluteFill, opacity: showInfo ? 1 : 0.5 }} />;
  };

  const renderInfoItem = () => {
    return <InfoItem visible={tag || showInfo} size={size} color={color} tag={tag} />;
  };

  const onItemPress = () => {
    setShowInfo(!showInfo);
  };

  return (
    <Pressable onPress={onItemPress}>
      <View onLayout={onContainerLayout}>
        {renderBorders()}
        {renderInfoItem()}
        {children}
      </View>
    </Pressable>
  );
};

export default LayoutInspector;

const randomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const iterateOverChildren = (children, props) => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const color = `#${randomColor()}`;

    return (
      <Container {...props} color={color} childProps={child.props} tag={child?.props?.tag}>
        {cloneElement(child, {
          ...child.props,
          children: iterateOverChildren(child.props.children, props)
        })}
      </Container>
    );
  });
};
