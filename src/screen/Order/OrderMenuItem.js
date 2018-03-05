/**
 * Created by gec-ios106 on 2017/12/6.
 */
import React, {PureComponent} from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {screen} from '../../widget'

class OrderMenuItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <Image source={this.props.icon} resizeMode="contain" style={styles.icon}/>
                <Text style={{color: '#222', fontSize: 14}}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        marginBottom: 5
    },
    icon: {
        width: 30,
        height: 30,
        margin: 5
    }
})

export default OrderMenuItem