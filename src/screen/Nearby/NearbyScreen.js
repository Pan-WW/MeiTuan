/**
 * Created by gec-ios106 on 2017/11/29.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'
import NearbyListScreen from './NearbyListScreen'
import {screen, color} from '../../widget'
import api from '../../api'

class NearbyScreen extends PureComponent {
    static navigationOptions = ({navigation}) =>({
        headerRight: (
            <TouchableOpacity style={styles.searchBar}>
                <Image
                    style={{width: 20, height: 20, margin: 5}}
                    source={require('../../img/Home/search_icon.png')}
                />
                <Text style={{fontSize: 13, color: '#777'}}>找附近的吃喝玩乐</Text>
            </TouchableOpacity>
        ),
        headerLeft: (
            <TouchableOpacity style={styles.localItem}>
                <Image
                    style={{width: 13, height: 16}}
                    source={require('../../img/Public/icon_food_merchant_address@2x.png')}
                />
                <Text style={{fontSize: 15, color: '#333'}}>广州 天河</Text>
            </TouchableOpacity>
        )
    })

    render() {

        let titles = ["享美食", "住酒店", "爱玩乐", "全部"]
        let types = [
            ["热门", "面包甜点", "小吃快餐", "川菜", "粤菜", "日本料理", "韩国料理", "东北菜", "台湾菜"],
            ["热门", "商务出行", "公寓民俗", "高星特惠", "情侣专享", "温泉酒店"],
            ["热门", "KTV", "足疗按摩", "酒吧", "电玩/游戏厅", "密室逃脱", "洗浴汗蒸"],
            []
        ]
        return (
            <ScrollableTabView
                style={styles.container}
                tabBarBackgroundColor="white"
                tabBarActiveTextColor={color.activeRed}
                tabBarInactiveTextColor="#555"
                tabBarUnderlineStyle={styles.underlineStyle}
            >
                {
                    titles.map((title, i) => (
                        <NearbyListScreen
                            tabLabel={title}
                            key={i}
                            types={types[i]}
                            url={api.recommend}
                            navigation={this.props.navigation}
                        />
                    ))
                }
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        width: screen.width * 0.65,
        height: 30,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        marginRight: 20
    },
    localItem: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    underlineStyle: {
        backgroundColor: color.activeRed
    }
})

export default NearbyScreen