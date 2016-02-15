import Relay from 'react-relay';

/**
 * Graphql mutation to add a new message
 */
export default class MessageAddMutation extends Relay.Mutation {

    /**
     * Define dependency fragments
     *
     * @type {object}
     */
    static fragments = {
        room: () => Relay.QL`fragment on Room { id }`
    };

    /**
     * Retrieve GraphQL string for mutation
     *
     * @returns {Relay.QL}
     */
    getMutation() {
        return Relay.QL`mutation { addMessage }`
    }

    /**
     * Get changed data on response
     *
     * @returns {Relay.QL}
     */
    getFatQuery() {
        return Relay.QL`
            fragment on MessageAddPayload {
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
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                room: this.props.room.id
            }
        }];
    }

    /**
     * Get variables for request
     *
     * @returns {object}
     */
    getVariables() {
        return {
            roomId: this.props.room.id,
            text: this.props.text
        };
    }
}