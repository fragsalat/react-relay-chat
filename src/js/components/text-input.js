import React from 'react';

/**
 * Render a form with a text input and a submit button
 */
export default class TextInput extends React.Component {

    /**
     * Define properties which are expected as attribute
     *
     * @type {object}
     */
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired
    };

    /**
     * Handler for form submission
     *
     * @param {object} event JavaScript event object
     */
    onSubmit(event) {
        event.preventDefault();
        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(this.refs.text.value);
            this.refs.text.value = '';
        }
    }

    /**
     * Render the message
     *
     * @returns {boolean}
     */
    render() {
        return (
            <form onSubmit={::this.onSubmit} className="text-input">
                <input type="text" placeholder="Write your message..." ref="text"/>
                <button type="submit"><i className="icon-check"></i></button>
            </form>
        );
    }
}