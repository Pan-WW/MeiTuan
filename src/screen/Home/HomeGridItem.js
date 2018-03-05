/**
 * Created by gec-ios106 on 2017/12/4.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {color, screen} from '../../widget'

class HomeGridItem extends PureComponent {
    render() {
        let info = this.props.info
        let title = info.maintitle
        let subTitle = info.deputytitle
        let color = info.deputy_typeface_color
        let imageUrl = info.imageurl.replace('w.h', '120.0')
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={{justifyContent: 'center', alignItems: 'center',}}>
                    <Text
                        style={
                        {
                            marginTop: 5,
                            fontSize: 16,
                            color: color,
                            fontWeight: 'bold'
                        }}
                    >
                        {title}
                    </Text>
                    <Text style={{marginTop: 10, fontSize: 13}}
                    >{subTitle}</Text>
                </View>
                <Image style={styles.icon} source={{uri: imageUrl}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: screen.width / 4 - screen.onPt,
        maxWidth: screen.width / 3 - screen.onPt,
        borderRightWidth: screen.onPt,
        borderColor: color.border
    },
    icon: {
        width: screen.width / 5,
        height: screen.width / 5,
        marginTop: 5
    }
})

export default HomeGridItem