/**
 * Created by gec-ios106 on 2017/12/4.
 */
import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import color from './color'
import screen from './screen'

class SpaceView extends PureComponent {
    render() {
        return (
            <View style={[styles.container,this.props.style]}/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 14,
        width: screen.width,
        borderBottomWidth: screen.onPt,
        borderTopWidth: screen.onPt,
        borderColor: color.border
    }
})

export default SpaceView