/**
 * MostPopularLanguages component which displays the most commonly used languages in repos.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getTopLanguage } from '../../datasource/GraphQL';

const MostPopularLanguages = () => {
  return (
    <div className="items most-popular-languages">

    </div>
  );
};

export default MostPopularLanguages;
