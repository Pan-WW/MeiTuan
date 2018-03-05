/**
 * Created by gec-ios106 on 2017/12/5.
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import RefreshState from './RefreshState'


class RefreshListView extends PureComponent {
    static propsTypes = {
        onHeaderRefresh: React.PropTypes.func, //上拉刷新
        onFooterRefresh: React.PropTypes.func  //下拉加载
    }
    static defaultProps = {
        footerRefreshingText: '数据加载中...',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据'
    }

    constructor(props) {
        super(props)
        this.state = {
            headerState: RefreshState.Idle,
            footerState: RefreshState.Idle,
        }
    }

    //头部刷新
    startHeaderRefreshing() {
        this.setState({headerState: RefreshState.Refreshing})
        this.props.onHeaderRefresh && this.props.onHeaderRefresh()
    }

    //底部刷新
    startFooterRefreshing() {
        this.setState({footerState: RefreshState.Refreshing})
        this.props.onFooterRefresh && this.props.onFooterRefresh()
    }

    //避免重复刷新
    shouldStartHeaderRefreshing() {
        if (this.state.headerState === RefreshState.Refreshing ||
            this.state.footerState === RefreshState.Refreshing) {
            return false
        }
        return true
    }

    shouldStartFooterRefreshing() {
        if (this.state.headerState === RefreshState.Refreshing ||
            this.state.footerState === RefreshState.Refreshing) { // 正在上拉刷新或者下拉加载时
            return false
        }
        if (this.state.footerState === RefreshState.NoMoreData) { //数据已经加载完毕
            return false
        }
        if (this.props.dataSource.getRowCount() === 0) { //代表api失效或刚开始加载页面
            return false
        }
        return true
    }

    // 刷新结束
    endRefreshing(refreshState) {
        if (refreshState === RefreshState.Refreshing) {
            return
        }
        let footerState = refreshState
        if (this.props.dataSource.getRowCount() === 0) {
            footerState = RefreshState.Idle
        }
        this.setState({
            headerState: RefreshState.Idle,
            footerState: footerState
        })
    }

    // 获取上拉刷新状态
    headerState() {
        return this.state.headerState
    }

    // 获取下拉加载状态
    footerState() {
        return this.state.footerState
    }

    onHeaderRefresh() {
        if (this.shouldStartHeaderRefreshing()) {
            this.startHeaderRefreshing()
        }
    }

    onFooterRefresh() {
        if (this.shouldStartFooterRefreshing()) {
            this.startFooterRefreshing()
        }
    }


    render() {
        return (
            <ListView
                {...this.props}
                enableEmptySections
                renderFooter={()=>this.renderFooter()}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.headerState === RefreshState.Refreshing}
                        onRefresh={() => this.onHeaderRefresh()}
                        tintColor='gray'
                    />
                }
                onEndReachedThreshold={20}
                onEndReached={()=> this.onFooterRefresh()}
            />
        )
    }

    renderFooter() {
        let footer = null
        switch (this.state.footerState) {
            case RefreshState.Idle:
                break
            case RefreshState.Refreshing:
                footer = (
                    <View style={styles.footerContainer}>
                        <ActivityIndicator size="small" color="#888"/>
                        <Text style={styles.footerText}>
                            {this.props.footerRefreshingText}
                        </Text>
                    </View>
                )
                break
            case RefreshState.NoMoreData:
                footer = (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            {this.props.footerNoMoreDataText}
                        </Text>
                    </View>
                )
                break
            case RefreshState.Failure:
                footer = (
                    <TouchableOpacity
                        style={styles.footerContainer}
                        onPress={()=>this.startFooterRefreshing()}>
                        <Text style={styles.footerText}>
                            {this.props.footerFailureText}
                        </Text>
                    </TouchableOpacity>
                )
                break
        }
        return footer
    }

}

const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    footerText: {
        fontSize: 14,
        color: '#555'
    }
})

export default RefreshListView