/**
 * Created by gec-ios106 on 2017/11/29.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native'
import OrderMenuItem from './OrderMenuItem'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'
import {DetailCell, SpaceView} from '../../widget'
import api from '../../api'

class OrderScreen extends PureComponent {
    static navigationOptions = ({navigation})=>({
        title: '订单',
        headerStyle: {backgroundColor: '#fff'}
    })

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            refreshing: false
        }
    }

    componentDidMount() {
        this.requestData()
    }

    async requestData() {

        this.setState({refreshing: true})

        try {
            let respones = await fetch(api.recommend)
            let json = await respones.json()


            let datalist = json.data.map((info) => {
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
                dataSource: datalist,
                refreshing: false
            })
        }
        catch (error) {

            this.setState({refreshing: false})

        }
    }

    renderHeader() {
        return (
            <View style={styles.container}>
                <DetailCell title="我的订单" subtitle="全部订单" style={{height: 38}}/>
                <View style={styles.itemContainer}>
                    <OrderMenuItem title="待付款" icon={require('../../img/Order/order_tab_need_pay@2x.png')}/>
                    <OrderMenuItem title="待使用" icon={require('../../img/Order/order_tab_need_use@2x.png')}/>
                    <OrderMenuItem title="待评价" icon={require('../../img/Order/order_tab_need_review@2x.png')}/>
                    <OrderMenuItem title="退款/售后"
                                   icon={require('../../img/Order/order_tab_needoffer_aftersale@2x.png')}/>
                </View>
                <SpaceView style={{backgroundColor: '#e0e0e0'}}/>
                <DetailCell title="我的收藏" subtitle="查看全部" style={{height: 38}}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    onRefresh={()=>this.requestData()}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={()=>this.renderHeader()}
                    keyExtractor={(item) => item.id}
                    renderItem={({item})=> (
                        <GroupPurchaseCell
                            info={item}
                            onPress={()=> this.props.navigation.navigate('Group',{info:item})}
                        />
                    )}
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default OrderScreen