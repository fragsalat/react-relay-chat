import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Message from './message';

/**
 * Render a set of messages
 */
class MessageList extends React.Component {

    /**
     * Determine if the should update the scroll position or not
     */
    componentWillUpdate() {
        var node = ReactDOM.findDOMNode(this);
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }

    /**
     * Update the scroll position to ensure we show the last added message.
     * In general this message should appear on bottom so we want to scroll to bottom if the
     * scroll position was before adding the message as well at bottom.
     */
    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            var node = ReactDOM.findDOMNode(this);
            node.scrollTop = node.scrollHeight
        }
    }

    /**
     * Render the messages
     *
     * @returns {boolean}
     */
    render() {
        let messages = this.props.messages;
        return (
            <ul className="messages">
                {messages.map(message => message && <Message key={message.id} message={message}/>)}
            </ul>
        );
    }
}

/**
 * Wrap the message list into relay container
 */
export default new Relay.createContainer(MessageList, {
    fragments: {
        messages: () => Relay.QL`
            fragments on Message @relay(plural: true) {
                id
                text
                time
                ${Message.getFragment('message')}
            }
        `
    }
});