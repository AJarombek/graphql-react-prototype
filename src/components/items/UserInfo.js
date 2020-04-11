/**
 * UserInfo component which displays general information about the user that the dashboard is for.
 * @author Andrew Jarombek
 * @since 4/11/2020
 */

import React, { useEffect, useState } from 'react';
import { getUserInfo } from "../../datasource/GraphQL";

const UserInfo = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserInfo('AJarombek')
            .then(result => {
                setUser(result.data.data.user);
            })
    });

    return (
        <div className="user-info">
            <figure>
                <img src={user.avatarUrl} alt="" />
            </figure>
            <p>{user.name}</p>
            <p>{user.location}</p>
            <a href={`https:\\\\${user.websiteUrl}`}>Personal Website</a>
        </div>
    );
};

export default UserInfo;
