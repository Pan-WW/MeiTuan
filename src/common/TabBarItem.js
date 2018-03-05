/**
 * Created by gec-ios106 on 2017/11/29.
 */
import React, {PureComponent} from 'react'
import {Image} from 'react-native'


class TabBarItem extends PureComponent {
    static protoTypes = {
        focused: React.PropTypes.bool,
        tintColor: React.PropTypes.string,
        selectImage: React.PropTypes.object,
        normalImage: React.PropTypes.object.isRequired
    }

    render() {
        let selectImage = this.props.selectImage ? this.props.selectImage : this.props.normalImage
        return (
            <Image
                source={this.props.focused ? selectImage : this.props.normalImage}
                style={{tintColor: this.props.tintColor, width: 26, height: 26}}
            />
        )
    }
}

export default TabBarItem

