/**
 * Created by gec-ios106 on 2017/11/30.
 */
import React, {PureComponent} from 'react'

import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {screen} from '../../widget'

export default class HomeMenuItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <Image
                    source={this.props.icon}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 5,
        height: screen.width / 5
    },
    icon: {
        width: screen.width / 10,
        height: screen.width / 10,
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        color: '#222'
    }
})