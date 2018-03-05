/**
 * Created by gec-ios106 on 2017/12/4.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    InteractionManager,
    StyleSheet,
} from 'react-native'
import NavigationItem from '../../common/NavigationItem'
import GroupPurchaseCell from './GroupPurchaseCell'
import GroupPurchaseDetail from './GroupPurchaseDetail'
import {color, screen, SpaceView, RefreshListView,RefreshState} from '../../widget'
import api, {groupPurchaseDetailWithId, recommendUrlWithId} from '../../api'


class GroupPurchaseScreen extends PureComponent {

    static navigationOptions = ({navigation}) =>({
        headerTitle: '团购详情',
        headerStyle: {backgroundColor: color.focus},
        headerBackTitle: null,
        headerTintColor: '#fff',
        headerRight: (
            <NavigationItem
                icon={require('../../img/Public/icon_navigationItem_share@2x.png')}
                iconStyle={{tintColor: '#fff', marginRight: 15, width: 24, height: 24}}
            />)
    })

    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            info: {},
            dataSource: ds.cloneWithRows([]) // 该方法可以将数组转化成DataSource数据类型伪数组
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.listView.startHeaderRefreshing()
        })

    }

    requestData() {
        this.requestDetail()
        this.requestReCommend()
    }

    requestDetail() {
        // groupPurchaseDetailWithId 该方法抓包获取的api请求不到数据
        // 我这里使用父元素传递过来的数据, 你们可以重新抓下包获取 详情数据的网址
    }

    async requestReCommend() {
        try {
            let {info} = this.props.navigation.state.params
            fetch(recommendUrlWithId(info.id))
                .then(response => response.json())
                .then(json => {
                    let datalist = json.data.deals.map(info => {
                        return {
                            id: info.id,
                            image: info.imgurl,
                            title: info.brandname,
                            subtitle: `[${info.range}]${info.title}`,
                            mtitle: info.title,
                            price: info.price,
                            value: info.value,
                            solds: info.solds
                        }
                    })
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(datalist)
                    })
                    this.listView.endRefreshing(RefreshState.NoMoreData)
                })
        }
        catch (error) {
            this.listView.endRefreshing(RefreshState.Failure)
        }
    }

    renderHeader() {
        let {info} = this.props.navigation.state.params
        return (
            <View>
                <View>
                    <Image
                        style={styles.banner}
                        source={{uri: info.image.replace('w.h', '160.0')}}
                        resizeMode="stretch"/>
                    <View style={styles.title}>
                        <Text style={[styles.colorWhite, {fontSize: 20, marginBottom: 10}]}>{info.title}</Text>
                        <Text style={[styles.colorWhite, {fontSize: 14}]}>{info.mtitle}</Text>
                    </View>
                </View>
                <View style={styles.topContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{color: color.focus, fontWeight: 'bold', fontSize: 30}}>{info.price}</Text>
                        <Text style={{color: color.focus}}>元 </Text>
                        <Text style={{color: "#777"}}> 门市价:{info.value}元</Text>
                    </View>
                    <TouchableOpacity style={styles.buyButton}>
                        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>立即抢购</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <GroupPurchaseDetail
                        color={color.focus}
                        image={require('../../img/Home/icon_deal_anytime_refund.png')}
                        detail="支持随时退款"
                    />
                    <GroupPurchaseDetail
                        color={color.focus}
                        image={require('../../img/Home/icon_deal_anytime_refund.png')}
                        detail="支持过期自动退"
                    />
                    <GroupPurchaseDetail
                        color="#000"
                        image={require('../../img/tabbar/pfb_tabbar_mine@2x.png')}
                        detail={`已售${info.solds}`}
                    />
                </View>
                <SpaceView/>
                <View style={styles.tipHeader}>
                    <Text style={styles.tipTitle}>看了本团购的用户还看了</Text>
                    <Text style={styles.tipTitle}>广告</Text>
                </View>

            </View>
        )
    }

    render() {
        return (
            <View>
                <RefreshListView
                    ref={(listView) => this.listView = listView}
                    renderHeader={() => this.renderHeader()}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => (
                        <GroupPurchaseCell
                            info={rowData}
                            onPress={() => this.props.navigation.navigate('Group', {info: rowData})}
                        />)}
                    onHeaderRefresh={()=>this.requestData()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    colorWhite: {
        color: 'white',
        fontWeight: 'bold'
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5
    },
    title: {
        justifyContent: 'center',
        width: screen.width,
        height: screen.width / 5,
        backgroundColor: 'rgba(7,17,27,0.3)',
        paddingHorizontal: 20,
        marginTop: -screen.width / 5,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 116,
        height: 36,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tipHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 35,
        width: screen.width,
        paddingHorizontal: 10
    },
    tipTitle: {
        fontSize: 17,
        color: '#777',
        fontWeight: 'bold'
    }
})

export default GroupPurchaseScreen