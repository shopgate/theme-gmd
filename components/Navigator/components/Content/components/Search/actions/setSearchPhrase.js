import { getSearchPhrase } from '@shopgate/pwa-common/selectors/history';
import setSearchSuggestionsPhrase from '@shopgate/pwa-common-commerce/search/action-creators/setSearchSuggestionsPhrase';

/**
 * Sets the current search phrase.
 * @param {string} query The request query.
 * @returns {Function} A redux thunk.
 */
const setSearchPhrase = query => (dispatch, getState) => {
  const searchPhrase = getSearchPhrase(getState()) || '';

  if (query === searchPhrase) {
    return;
  }

  dispatch(setSearchSuggestionsPhrase(query));
};

export default setSearchPhrase;
