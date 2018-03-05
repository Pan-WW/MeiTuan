/**
 * Created by gec-ios106 on 2017/12/5.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import {screen, color} from '../../widget'

class NearbyHeaderView extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.types.map((type, i) => (
                        <TouchableOpacity
                            style={[styles.item, {backgroundColor: this.props.selectedIndex == i ? color.activeRed : '#fff'}]}
                            key={i}
                            onPress={() => this.props.onSelected(i)}
                        >
                            <Text
                                style={[styles.title, {color: this.props.selectedIndex == i ? "#fff": '#555'}]}
                            >{type}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        width: screen.width / 4 - 10,
        height: 30,
        marginLeft: 8,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: screen.onPt,
        borderColor: color.border
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'
    }
})

export default NearbyHeaderView