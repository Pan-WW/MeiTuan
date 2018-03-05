/**
 * Created by gec-ios106 on 2017/11/30.
 */
import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet,
    Text,
    WebView,
    InteractionManager
} from 'react-native'
import {color} from '../../widget'

class WebScreen extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title
    })

    constructor(props) {
        super(props)
        this.state = {
            source: {}
        }
    }

    state:{
        source: React.PropTypes.object
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=> {
            this.props.navigation.setParams({title: '加载中'})
            this.setState({source: {url: this.props.navigation.state.params.url}})
        })
    }

    onLoadEnd(e) {
        if (e.nativeEvent.title.length > 0) {
            this.props.navigation.setParams({title: e.nativeEvent.title})
        }
    }

    onLoad(e) {
        const script = " document.getElementsByTagName('header')[0].style.display='none' "
        if (this.webView) {
            this.webView.injectJavaScript(script)
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    ref={(webView) => {
                        this.webView = webView
                    }}
                    style={styles.webView}
                    source={this.state.source}
                    scalesPageToFit
                    onLoadEnd={(e) => this.onLoadEnd(e)}
                    onLoad={(e)=>this.onLoad(e)}
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    webView: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default WebScreen