/**
 * UserInfo component which displays general information about the user that the dashboard is for.
 * @author Andrew Jarombek
 * @since 4/11/2020
 */

import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../datasource/GraphQL';

const UserInfo = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserInfo('AJarombek')
      .then(result => {
        if (result.data.data) {
          setUser(result.data.data.user);
          setError(null);
        } else {
          setError(result.data.errors[0].message);
        }
      });
  });

  return (
    <div className="items user-info">
      {error ?
        <div className="error">
          <h6>{error}</h6>
        </div>
        :
        <>
          <figure>
            <img src={user.avatarUrl} alt=""/>
          </figure>
          <h2>{user.name}</h2>
          <p>{user.location}</p>
          <a href={`https:\\\\${user.websiteUrl}`}>Personal Website</a>
        </>
      }
    </div>
  );
};

export default UserInfo;
