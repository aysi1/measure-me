import { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

class Button extends Component {
    constructor(props) {
        super(props);
        this.bgColor = props.color || '#000';
        // Alert.alert(this.bgColor);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.parea, {backgroundColor: this.bgColor}]}>
                {/* <Text style={styles.text}>{this.props.title}</Text> */}
                <AntDesign name={this.props.iconName} size={32} color="#fff" />
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    parea: {
        height: 64,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        margin: 8,
        shadowOffset: {width: 0, height: 0},
        shadowColor: '#333',
        shadowOpacity: 0.51,
        shadowRadius: 7,
        elevation: 16
    },
    text: {
        color: '#fff',
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontSize: 12
    }
})

export default Button;