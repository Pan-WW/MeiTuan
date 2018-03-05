/**
 * Created by gec-ios106 on 2017/11/29.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native'
import NavigationItem from '../../common/NavigationItem'
import {color, screen, SpaceView} from '../../widget'
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import api from '../../api'

class HomeScreen extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image
                    source={require('../../img/Home/icon_homepage_search.png')}
                    style={styles.searchIcon}
                />
                <Text style={styles.searchText}>输入商家/品类/商品</Text>
            </TouchableOpacity>
        ),
        headerLeft: (
            <NavigationItem
                title="广州"
                icon={require('../../img/Home/icon_homepage_downArrow@2x.png')}
                iconStyle={{width: 10, height: 10}}
            />),
        headerRight: (<NavigationItem icon={require('../../img/Home/icon_homepage_map_old.png')}/>),
        headerStyle: {backgroundColor: color.focus},
        headerBackTitle: null
    })

    constructor(props) {
        super(props)
        this.state = {
            discounts: [],
            dataList: [],
            refreshing: false
        }
        this.requestData = this.requestData.bind(this)
        this.keyExtractor = this.keyExtractor.bind(this)

        this.onMenuSelect = this.onMenuSelect.bind(this)
        this.onGridSelect = this.onGridSelect.bind(this)
        this.onCellSelected = this.onCellSelected.bind(this)

        this.renderCell = this.renderCell.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
    }

    componentDidMount() {
        this.requestData()
    }

    requestData() {
        this.setState({refreshing: true})
        this.requestRecommend()
        this.requestDiscounts()
    }

    requestRecommend() {
        try {
            fetch(api.recommend)
                .then((response) => response.json())
                .then((json) => {
                    let datalist = json.data.map(
                        (info) => {
                            return {
                                id: info.id,
                                image: info.imgurl,
                                title: info.mname,
                                subtitle: `[${info.range}]${info.mtitle}`,
                                mtitle: info.mtitle,
                                price: info.price,
                                value: info.value,
                                solds: info.solds
                            }
                        })
                    this.setState({
                        dataList: datalist,
                        refreshing: false
                    })
                })
        }
        catch (error) {
            alert(error)
            this.setState({
                refreshing: false
            })
        }
    }

    async requestDiscounts() {
        try {
            let response = await fetch(api.discount)
            let json = await response.json()
            this.setState({discounts: json.data})

        }
        catch (error) {
            alert(error)
        }
    }


    onMenuSelect(url) {
        this.props.navigation.navigate('Web', url)
    }

    onGridSelect(index) {
        let discount = this.state.discounts[index]
        if (discount.type === 1) {
            let location = discount.tplurl.indexOf('http')
            let url = discount.tplurl.slice(location)
            //因为我们某些网址是http%3a%2f%2f这种 encodeURI()url编码 我们要转化
            url = decodeURIComponent(url)
            this.props.navigation.navigate('Web', {url: url})
        }
    }

    onCellSelected(info) {
        this.props.navigation.navigate('Group',{info})
    }

    keyExtractor(item) {
        return item.id
    }

    renderHeader() {
        return (
            <View>
                <HomeMenuView menuInfo={api.menuInfo} onMenuSelect={this.onMenuSelect}/>
                <SpaceView/>
                <HomeGridView infos={this.state.discounts} onGridSelect={this.onGridSelect}/>
                <SpaceView/>
                <View style={styles.recommendHeader}>
                    <Text style={{fontSize: 17}}>猜你喜欢</Text>
                </View>
            </View>
        )
    }

    renderCell({item}) {
        return (
            <GroupPurchaseCell
                info={item}
                onPress={this.onCellSelected}
            />
        )

    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataList}
                    keyExtractor={this.keyExtractor}
                    refreshing={this.state.refreshing}
                    onRefresh={this.requestData}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                />
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        searchBar: {
            width: screen.width * 0.7,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            backgroundColor: color.darkGreen,
            borderRadius: 8
        },
        searchIcon: {
            width: 16,
            height: 16,
            marginRight: 10
        },
        searchText: {
            fontWeight: 'bold',
            color: color.activeText,
        },
        recommendHeader: {
            height: 40,
            padding: 10,
            borderColor: color.border,
            borderBottomWidth: screen.onPt
        }
    })

export
default
HomeScreen