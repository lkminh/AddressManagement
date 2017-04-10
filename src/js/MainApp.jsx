import React from 'react'
import {Provider} from 'react-redux'
import Storage from './storage.js'
import HomeView from './routes/Home/HomeView.jsx'
import AddAddressView from './routes/Add/AddAddressView.jsx'
import EditAddressView from './routes/Edit/EditAddressView.jsx'
import {configureStore} from './store/configureStore.js'
import {
    BrowserRouter,
    Route,
    Link,
    NavLink
} from 'react-router-dom'

export default class MainApp extends React.Component {
    constructor(props) {
        super(props)
        const initialState = {
            address: Storage.load()
        };
        this.store = configureStore(initialState)
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            Storage.save(this.store.getState().address);
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <Provider store={this.store}>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={HomeView}/>
                        <Route exact path='/add' component={AddAddressView}/>
                        <Route path='/edit/:addressId' component={EditAddressView}/>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}
