import '../style/scss/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Room from './components/room';

/**
 * Route to get chat room data
 */
class ChatRoute extends Relay.Route {
    static routeName = 'Chat';
    static paramDefinitions = {
        id: {required: true}
    };
    static queries = {
        room: Component => Relay.QL`
            query RoomQuery {
                room(id: $id) {
                    ${Component.getFragment('room')}
                }
            }
        `
    };
}

// Init react render process
ReactDOM.render(
    <Relay.RootContainer Component={Room} route={new ChatRoute({id: 'main'})}/>,
    document.querySelector('.main-app')
)