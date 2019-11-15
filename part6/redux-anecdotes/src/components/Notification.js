import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  const renderNotification = () => {
    if (!store.getState().notification) {
      return;
    }
    return <div style={style}>{store.getState().notification}</div>;
  };
  return <>{renderNotification()}</>;
};

export default Notification;
