/**
 * Class to represent a single message
 */
export default class Message {

    /**
     * Global counter for id's
     *
     * @type {number}
     */
    static globalId = 0;

    /**
     * Initialize the message
     *
     * @param {Room} room
     * @param {string} text
     * @param {number} time
     */
    constructor(room, text, time) {
        this.id = Message.globalId++;
        this.room = room;
        this.text = text;
        this.time = time;
    }
}