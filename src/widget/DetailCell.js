/**
 * Created by gec-ios106 on 2017/12/6.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import color from './color'
import screen from './screen'

class DetailCell extends PureComponent {
    render() {
        let icon = this.props.image && <Image style={styles.icon} source={this.props.image}/>
        return (
            <TouchableOpacity style={styles.container}>
                <View style={[styles.content, this.props.style]}>
                    {icon}
                    <Text style={{color: '#222', fontSize: 14}}>{this.props.title}</Text>
                    <View style={styles.rightContent}>
                        <Text style={{color: '#999'}}>{this.props.subtitle}</Text>
                        <Image style={styles.arrow} source={require('../img/Public/cell_arrow.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: screen.onPt,
        borderColor: color.border
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10
    },
    rightContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5
    }
})


export default DetailCell