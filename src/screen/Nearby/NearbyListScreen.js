/**
 * Created by gec-ios106 on 2017/12/5.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    ListView
} from 'react-native'
import NearbyHeaderView from './NearbyHeaderView'
import {RefreshState, RefreshListView} from '../../widget'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'


class NearbyListScreen extends PureComponent {
    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            typeIndex: 0,
            dataSource: ds.cloneWithRows([]),
            url: this.props.url
        }
    }

    componentDidMount() {
        this.listView.startHeaderRefreshing()
    }

    requestData() {
        try {
            fetch(this.state.url)
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
                    //因为没抓取到不同商品分类的api,用主页的商品进行随机打乱视觉上达到数据不同的效果
                    datalist.sort(()=> {
                        return 0.5 - Math.random()
                    })
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(datalist)})
                    this.listView.endRefreshing(RefreshState.NoMoreData)
                })
        }
        catch (error) {
            this.listView.endRefreshing(RefreshState.Failure)
        }
    }

    renderHeader() {
        return (
            <NearbyHeaderView
                types={this.props.types}
                selectedIndex={this.state.typeIndex}
                onSelected={(i) => {
                    if (i !== this.state.typeIndex) {
                        this.setState({typeIndex: i})
                        this.requestData()
                    }
                }}
            />
        )
    }

    render() {
        return (
            <RefreshListView
                ref={(listView) => this.listView = listView}
                renderHeader={() => this.renderHeader()}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => (
                    <GroupPurchaseCell
                        info={rowData}
                        onPress={()=>this.props.navigation.navigate('Group', {info: rowData})}
                    />
                )}
                onHeaderRefresh={()=> this.requestData()}
            />
        )
    }
}


export default NearbyListScreen