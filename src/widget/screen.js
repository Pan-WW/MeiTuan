/**
 * Created by gec-ios106 on 2017/11/29.
 */
import {Dimensions, PixelRatio} from 'react-native'

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onPt: 1 / PixelRatio.get()
}