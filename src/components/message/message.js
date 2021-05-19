import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Bus from '../../utils/bus';

const Message = () => {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState('');
  let [type, setType] = useState('warning');

  useEffect(() => {
    const handleMessage = ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    };
    const subscription = Bus.addListener('message', handleMessage);
    return () => subscription.removeListener('message', handleMessage);
  }, []);

  return visibility && <Alert severity={type}>{message}</Alert>;
};

export default Message;
