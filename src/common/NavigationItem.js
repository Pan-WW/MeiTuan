/**
 * Created by gec-ios106 on 2017/11/29.
 */
import React, {PureComponent} from 'react'
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native'


class NavigationItem extends PureComponent {

    render() {
        let Icon = this.props.icon && <Image source={this.props.icon} style={[styles.icon,this.props.iconStyle]}/>
        let Title = this.props.title && <Text style={styles.title}>{this.props.title}</Text>
        return (
            <TouchableOpacity style={styles.container}>
                {Title}
                {Icon}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        margin: 4
    },
    icon: {
        width: 27,
        height: 27,
        margin: 4
    }

})

export default NavigationItem

