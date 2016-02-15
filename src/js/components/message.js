import React from 'react';
import Relay from 'react-relay';
import MessageEditMutation from '../mutations/message-edit-mutation';
import MessageDeleteMutation from '../mutations/message-delete-mutation';

/**
 * Render a message oject
 */
class Message extends React.Component {

    /**
     * Handler for request to edit a message
     *
     * @param {object} event JavaScript event object
     */
    onEdit(event) {
        event.preventDefault();
        let text = prompt('Whats the new message?');
        if (text) {
            Relay.Store.commitUpdate(new MessageEditMutation({
                text: text,
                message: this.props.message
            }));
        }
    }

    /**
     * Handler for request deletion of a message
     *
     * @param {object} event JavaScript event object
     */
    onDelete(event) {
        event.preventDefault();
        if (confirm('Do you really want to delete this message?')) {
            Relay.Store.commitUpdate(new MessageDeleteMutation({
                message: this.props.message
            }));
        }
    }

    /**
     * Render the message
     *
     * @returns {boolean}
     */
    render() {
        let {id, text, time} = this.props.message;
        let date = new Date(time);
        return (
            <li>
                <h6>You wrote on {date.toDateString()} at {date.toTimeString()}:</h6>
                <p>{text}</p>
                <div className="actions">
                    <button onClick={::this.onEdit}><i className="icon-pencil"></i></button>
                    <button onClick={::this.onDelete}><i className="icon-trash"></i></button>
                </div>
            </li>
        );
    }
}

/**
 * Wrap message into relay container
 */
export default new Relay.createContainer(Message, {
    fragments: {
        message: () => Relay.QL`
            fragment on Message {
                id
                text
                time
                ${MessageEditMutation.getFragment('message')}
                ${MessageDeleteMutation.getFragment('message')}
            }
        `
    }
});