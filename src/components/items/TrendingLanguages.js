/**
 * TrendingLanguages component which displays top languages in the past two years.
 * @author Andrew Jarombek
 * @since 4/21/2020
 */

import React, { useEffect, useState } from 'react';
import { getTopLanguage } from '../../datasource/GraphQL';

const TrendingLanguages = () => {
  return (
    <div className="items trending-languages">

    </div>
  );
};

export default TrendingLanguages;
