/**
 * Created by gec-ios106 on 2017/12/5.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'

import {color, screen} from '../../widget'


class GroupPurchaseDetail extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.image} style={{tintColor: this.props.color, width: 16, height: 16}}/>
                <Text style={{color: this.props.color, marginLeft: 5}}>{this.props.detail}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 16,
        width: screen.width * 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    }
})

export default GroupPurchaseDetail