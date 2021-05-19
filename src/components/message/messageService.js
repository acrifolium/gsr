import Bus from '../../utils/bus';

const MessageService = {
  info: message => Bus.emit('message', { message, type: 'info' }),
  success: message => Bus.emit('message', { message, type: 'success' }),
  warning: message => Bus.emit('message', { message, type: 'warning' }),
  error: message => Bus.emit('message', { message, type: 'error' })
};

export default MessageService;
