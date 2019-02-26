import React, {
    Component
} from 'react';
import httpLists from '../../utils/http'
import { connect } from 'react-redux';
import NavigationToggle from '../../webComponents/NavigationToggle/NavigationToggle'
import './index.less'
let { containHttp } = httpLists
const { } = containHttp
@connect(
    state => {
        return {
        }
    },
    dispatch => {
        return {
        }
    }
)
class WebHomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {


    }
    render() {
        return (
            <div className="homePage">
                <NavigationToggle />
            </div>
        )
    }
}
export default WebHomePage
