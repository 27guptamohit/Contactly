import {StatusBar} from "expo-status-bar";
import React, {useState, useRef} from "react";
import {Text, View, StyleSheet, FlatList, Animated} from "react-native";
import {slideData} from "./02.1_onboarding_screen_data";
import OnboardingItem from "./02.2_onboarding_item";
import Paginator from "./02.3_paginator";

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    return (
        <View style={styles.container}>
            <View style={{flex:3}}>
                <FlatList data={slideData}
                          renderItem={({item}) => <OnboardingItem item={item} />}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          pagingEnabled
                          bounces={false}
                          keyExtractor={(item) => item.id}
                          onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],
                              {useNativeDriver:false,})}
                          scrollEventThrottle={32}
                          onViewableItemsChanged={viewableItemsChanged}
                          viewabilityConfig={viewConfig}
                          ref={slidesRef}
                />
            </View>

            <Paginator data={slideData} scrollX={scrollX}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})