import React from 'react';
import Relay from 'react-relay';
import MessageList from './message-list';
import TextInput from './text-input';
import MessageAddMutation from '../mutations/message-add-mutation';

/**
 * Class to render a chat room
 */
class Room extends React.Component {

    /**
     * Handler for text input submission to create a new message
     *
     * @param {string} text
     */
    createMessage(text) {
        Relay.Store.commitUpdate(new MessageAddMutation({
            text: text,
            room: this.props.room
        }));
    }

    /**
     * Render the room using jsx
     *
     * @returns {boolean}
     */
    render() {
        let {name, messages} = this.props.room;
        return (
            <section className="content">
                <h3 className="room-name"><i className="icon-chat"></i> {name}</h3>
                <MessageList messages={messages}/>
                <TextInput onSubmit={::this.createMessage}/>
            </section>
        );
    }
}

/**
 * Wrap the room into relay container
 */
export default new Relay.createContainer(Room, {
    fragments: {
        room: () => Relay.QL`
            fragment on Room {
                id
                name
                messages {
                    ${MessageList.getFragment('messages')}
                }
                ${MessageAddMutation.getFragment('room')}
            }
        `
    }
});