/**
 * Reusable functions used in the dashboard item components.  Functions interact with GitHub
 * GraphQL query responses.
 * @author Andrew Jarombek
 * @since 4/23/2020
 */

import moment from 'moment';

const getLanguagesSortedByOccurrence = (repositories, recentOnly = false) => {
  const languages = {};

  for (let repo of repositories) {
    const creationDate = repo.node.createdAt;

    if (!recentOnly || moment(creationDate) >= moment("2019-01-01")) {
      const language = repo.node.primaryLanguage.name;

      if (languages.hasOwnProperty(language)) {
        languages[language] = languages[language] + 1;
      } else {
        languages[language] = 1;
      }
    } else {
      break;
    }
  }

  const sortedLanguages = [];
  for (const language in languages) {
    sortedLanguages.push({
      name: language,
      occurrences: languages[language]
    });
  }

  sortedLanguages.sort((a, b) => b.occurrences - a.occurrences);
  return sortedLanguages
};

export { getLanguagesSortedByOccurrence };
