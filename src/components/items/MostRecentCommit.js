/**
 * MostRecentCommit component which displays repositories that have been contributed to most
 * recently.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getMostRecentCommit } from '../../datasource/GraphQL';

const MostRecentCommit = () => {
  return (
    <div className="items most-recent-commit">

    </div>
  );
};

export default MostRecentCommit;
