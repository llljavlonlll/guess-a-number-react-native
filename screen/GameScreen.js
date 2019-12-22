import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, index, roundNum) => (
    <View key={index} style={styles.listItem}>
        <BodyText>Round #{roundNum}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const guess = direction => {
        if (
            (direction === "lower" && currentGuess < userChoice) ||
            (direction === "greater" && currentGuess > userChoice)
        ) {
            Alert.alert(
                "Cheating!",
                "Please give correct directions for computer to guess the correct number",
                [{ text: "Sorry", style: "cancel" }]
            );
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
            console.log("currentHigh", currentHigh.current);
        } else {
            currentLow.current = currentGuess;
            console.log("currentLow", currentLow.current);
        }

        const nextGuess = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );

        setCurrentGuess(nextGuess);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuess => [nextGuess, ...curPastGuess]);
    };

    return (
        <View style={styles.screen}>
            <BodyText>Opponent's guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                    <MainButton onPress={() => guess("lower")}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={styles.button}>
                    <MainButton onPress={() => guess("greater")}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) =>
                        renderListItem(guess, index, pastGuesses.length - index)
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 400,
        maxWidth: "90%"
    },
    button: {
        width: 130,
        borderRadius: 3,
        overflow: "hidden"
    },
    list: {
        width: "80%",
        flex: 1
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around"
    }
});

export default GameScreen;
