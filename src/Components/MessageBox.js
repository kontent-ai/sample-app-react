import React from 'react';

import infoImage from '../Images/Admin/info.svg';

const MessageBox = props => {
  if (!props.message) {
    return null;
  }

  return (
    <div id="message-box" className="container message">
      <section className="messages">
        <table className="user-message message-info">
          <tbody>
            <tr>
              <td className="message-icon">
                <img src={infoImage} height="44" width="44" alt="info icon" />
              </td>
              <td className="message-content">
                <p>{props.message}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MessageBox;
