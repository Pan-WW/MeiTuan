/**
 * Created by gec-ios106 on 2017/11/30.
 */
import React, {PureComponent} from 'react'
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native'
import HomeMenuItem from './HomeMenuItem'
import {screen, color, PageControl} from '../../widget'

class HomeMenuView extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0
        }
        this.onPageIndicatorPress = this.onPageIndicatorPress.bind(this)
        this.onScroll = this.onScroll.bind(this)
    }

    onPageIndicatorPress(index) {
        if (index === this.state.currentPage) {
            return
        }
        let offsetX = index * screen.width
        this.scrollView.scrollTo({x: offsetX})
        this.setState({
            currentPage: index
        })

    }

    onScroll(e) {
        let x = e.nativeEvent.contentOffset.x
        let currPage = Math.round(x / screen.width)
        if (currPage !== this.state.currentPage) {
            this.setState({
                currentPage: currPage
            })
        }
    }

    render() {
        const {menuInfo, onMenuSelect} = this.props
        let menuItems = menuInfo.map((info, i) => (
            <HomeMenuItem
                key={i}
                icon={info.icon}
                title={info.title}
                onPress={()=> {
                    if (info.path && onMenuSelect) {
                        onMenuSelect(info.path)
                    }
                }}
            />
        ))
        let menuViews = []
        let pageCount = Math.ceil(menuItems.length / 10)

        for (let i = 0; i < pageCount; i++) {
            let length = menuItems.length < (i + 1) * 10 ? menuItems.length - (i * 10) : 10
            let items = menuItems.slice(i * 10, i * 10 + length)
            let menuView = (<View style={styles.itemView} key={i}>{items}</View>)
            menuViews.push(menuView)
        }
        console.log(pageCount)

        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView)=> {
                        this.scrollView = scrollView
                    }}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.onScroll}
                >
                    <View style={styles.menuContainer}>
                        {menuViews}
                    </View>
                </ScrollView>
                <PageControl
                    style={styles.pageControl}
                    numberOfPages={pageCount}
                    currentPage={this.state.currentPage}
                    hidesForSinglePage
                    indicatorSize={{width: 8, height: 8}}
                    pageIndicatorTintColor="gray"
                    currentPageIndicatorTintColor={color.focus}
                    onPageIndicatorPress={this.onPageIndicatorPress}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    menuContainer: {
        flexDirection: 'row'
    },
    itemView: {
        flexDirection: 'row',
        width: screen.width,
        flexWrap: 'wrap'
    },
    pageControl: {
        margin: 10
    }
})


export default HomeMenuView