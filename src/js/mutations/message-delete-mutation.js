import Relay from 'react-relay';

/**
 * GraphQL mutation to delete a existing message
 */
export default class MessageDeleteMutation extends Relay.Mutation {

    /**
     * Define dependency fragments
     *
     * @type {object}
     */
    static fragments = {
        message: () => Relay.QL`fragment on Message { id }`
    };

    /**
     * Retrieve GraphQL string for mutation
     *
     * @returns {Relay.QL}
     */
    getMutation() {
        return Relay.QL`mutation { deleteMessage }`
    }

    /**
     * Get changed data on response
     *
     * @returns {Relay.QL}
     */
    getFatQuery() {
        return Relay.QL`
            fragment on MessageDeletePayload {
                 room {
                    messages {
                        id
                        text
                        time
                    }
                }
            }
        `
    }

    /**
     * Get configuration for this mutation
     *
     * @returns {Array}
     */
    getConfigs() {
        console.log(this.props.message.roomId);
        return [{
            type: 'NODE_DELETE',
            parentName: 'room',
            parentID: this.props.message.roomId,
            connectionName: 'messages',
            deletedIDFieldName: 'deletedMessageId'
        }];
    }

    /**
     * Get variables for request
     *
     * @returns {object}
     */
    getVariables() {
        return {
            id: this.props.message.id
        };
    }
}