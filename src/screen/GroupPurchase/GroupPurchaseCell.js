/**
 * Created by gec-ios106 on 2017/12/4.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {color, screen} from '../../widget'


class GroupPurchaseCell extends PureComponent {
    render() {
        let {info} = this.props
        let imageUrl = info.image.replace('w.h', '160.0')
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image style={styles.icon} source={{uri: imageUrl}}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{info.title}</Text>
                    <Text style={styles.subtitle}>{info.subtitle}</Text>
                    <View style={styles.desc}>
                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>{info.price}</Text>
                            <Text style={{fontSize: 14, color: color.focus}}>元 </Text>
                            <Text style={styles.smallFont}>门市价:{info.value}元</Text>
                        </View>
                        <Text style={[styles.smallFont, {marginTop: 5}]}>已售{info.solds}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onPt,
        borderColor: color.border
    },
    icon: {
        width: 80,
        height: 80,
        borderRadius: 5
    },
    rightContainer: {
        flex: 1,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        color: '#222'
    },
    subtitle: {
        fontSize: 13,
        color: '#555',
        marginTop: 5
    },
    desc: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.focus
    },
    smallFont: {
        fontSize: 13,
        color: '#777'
    }
})

export default GroupPurchaseCell