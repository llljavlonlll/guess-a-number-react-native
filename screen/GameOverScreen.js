import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    // source={require("../assets/success.png")}
                    source={{
                        uri:
                            "https://previews.123rf.com/images/skazz/skazz1806/skazz180600005/103022499-cholatse-mountain-peak-in-cloudy-day-view-from-renjo-la-pass-everes-region-nepal-asia.jpg"
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <BodyText style={styles.resultText}>
                Your phone needed{" "}
                <Text style={styles.highligh}>{props.numOfRounds}</Text> rounds
                to guess the number{" "}
                <Text style={styles.highligh}>{props.userNumber}</Text>
            </BodyText>
            <View style={styles.button}>
                <MainButton onPress={props.restartGame}>NEW GAME</MainButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: "center", alignItems: "center" },
    button: {
        marginVertical: 20
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderColor: "black",
        borderRadius: 150,
        borderWidth: 3,
        overflow: "hidden",
        marginVertical: 20
    },
    image: {
        width: "100%",
        height: "100%"
    },
    resultText: {
        textAlign: "center",
        fontSize: 20,
        marginHorizontal: 30,
        marginTop: 30
    },
    highligh: {
        color: Colors.primary,
        fontFamily: "open-sans-bold"
    }
});

export default GameOverScreen;
