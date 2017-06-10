import SocketIOClient from 'socket.io-client';
import CONFIG from '../../../config/development.json';

const socket = SocketIOClient(CONFIG.URL);

export default socket;
