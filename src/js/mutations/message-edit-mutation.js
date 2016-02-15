import Relay from 'react-relay';

/**
 * GraphQL mutation to edit a existing message
 */
export default class MessageEditMutation extends Relay.Mutation {

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
        return Relay.QL`mutation { editMessage }`
    }

    /**
     * Get changed data on response
     *
     * @returns {Relay.QL}
     */
    getFatQuery() {
        return Relay.QL`
            fragment on MessageEditPayload {
                message {
                    id
                    text
                    time
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
                message: this.props.message.id
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
            id: this.props.message.id,
            text: this.props.text
        };
    }
}