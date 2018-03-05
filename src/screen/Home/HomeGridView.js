/**
 * Created by gec-ios106 on 2017/12/4.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {screen, color} from '../../widget'
import HomeGridItem from './HomeGridItem'
class HomeGridView extends PureComponent {
    static defaultProps = {
        infos: []
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.infos.map((info, index) => (
                        <HomeGridItem
                            key={index}
                            info={info}
                            onPress={() => this.props.onGridSelect(index)}
                        />
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    }
})

export default HomeGridView