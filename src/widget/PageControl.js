/**
 * Created by gec-ios106 on 2017/11/30.
 */
import React, {PureComponent} from 'react'
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'

class PageControl extends PureComponent {
    static propTypes = {
        numberOfPages: React.PropTypes.number.isRequired,
        currentPage: React.PropTypes.number,
        hidesForSinglePage: React.PropTypes.bool,
        pageIndicatorTintColor: React.PropTypes.string,
        currentPageIndicatorTintColor: React.PropTypes.string,
        indicatorSize: React.PropTypes.object,
        indicatorStyle: View.propTypes.style,
        currentIndicatorStyle: View.propTypes.style,
        onPageIndicatorPress: React.PropTypes.func
    }

    static defaultProps = {
        numberOfPages: 0,
        currentPage: 0,
        hidesForSinglePage: false,
        pageIndicatorTintColor: 'gray',
        currentPageIndicatorTintColor: 'white',
        indicatorSize: {width: 8, height: 8},
        indicatorStyle: {},
        currentIndicatorStyle: {},
        onPageIndicatorPress: function () {

        }
    }

    onPageIndicatorPress(index) {
        this.props.onPageIndicatorPress(index)
    }

    render() {
        let {style, ...props} = this.props
        let indicatorItermStyle = {
            width: this.props.indicatorSize.width,
            height: this.props.indicatorSize.height,
            borderRadius: this.props.indicatorSize.height / 2,
            marginHorizontal: 5
        }

        let indicatorStyle = Object.assign({}, indicatorItermStyle, this.props.indicatorStyle, {
            backgroundColor: this.props.pageIndicatorTintColor
        })
        let currentIndicatorStyle = Object.assign({}, indicatorItermStyle, this.props.currentIndicatorStyle, {
            backgroundColor: this.props.currentPageIndicatorTintColor
        })

        let pages = []

        for (let i = 0; i < this.props.numberOfPages; i++) {
            pages.push(i)
        }

        let pageItems = pages.map((info, i) => (
            <TouchableWithoutFeedback
                key={i}
                onPress={() => this.onPageIndicatorPress(i)}
            >
                <View style={i === this.props.currentPage ? currentIndicatorStyle : indicatorStyle}></View>
            </TouchableWithoutFeedback>
        ))

        return (
            this.props.hidesForSinglePage && this.props.numberOfPages <= 1 ? null : (
                <View style={[styles.container, style, {height: this.props.indicatorSize.height}]}>
                    {pageItems}
                </View>
            )
        )

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default PageControl