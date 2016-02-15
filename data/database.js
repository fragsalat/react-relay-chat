import Room from './room';
import Message from './message';

// Create sample data
let mainRoom = new Room('main', 'Main Room');
let messages = ['Sample', 'Message', 'Text'].map((text) => new Message(mainRoom, text, new Date().getTime()));

/**
 * Get a room by id string
 * The id has to be a string because relay doesn't permit numbers on root element id's
 *
 * @param {string} id
 * @returns {Room|null}
 */
export var getRoom = id => {
  return mainRoom.id === id ? mainRoom : null;
}

/**
 * Get all messages for a single room by it's id
 *
 * @param {string} roomId
 * @returns {Array.<T>}
 */
export var getMessages = roomId => {
  return messages.filter(message => message.room.id === roomId);
}

/**
 * Get a message by id
 *
 * @param {number} id
 * @returns {T}
 */
export var getMessage = id => {
  return messages.find(message => message.id === id);
}

/**
 * Create a new message and add it to the store
 *
 * @param {string} roomId
 * @param {string} text
 * @returns {Message}
 */
export var addMessage = (roomId, text) => {
  let room = getRoom(roomId);
  // Create new message
  let message = new Message(room, text.trim(), new Date().getTime());
  // Add to messages
  messages.push(message);

  return message;
}

/**
 * Edit a existing message
 *
 * @param {number} id
 * @param {string} text
 * @returns {T}
 */
export var editMessage = (id, text) => {
  let message = messages.find(message => message.id === id);
  message.text = text.trim();
  return message;
}

/**
 * Delete a existing message
 *
 * @param {number} id
 * @returns {T}
 */
export var deleteMessage = id => {
  let message = messages.find(message => message.id === id);
  let index = messages.indexOf(message);
  if (index !== -1) {
    messages.splice(index, 1);
  }
  return message;
}