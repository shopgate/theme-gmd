import { connect } from 'react-redux';
import fetchSearchSuggestions from '@shopgate/pwa-common-commerce/search/actions/fetchSearchSuggestions';
import {
  getSearchSuggestionsPhrase,
  getCurrentSearchSuggestions,
  isFetchingCurrentSearchSuggestions,
} from '@shopgate/pwa-common-commerce/search/selectors';
import setSearchSuggestionsPhrase from '@shopgate/pwa-common-commerce/search/action-creators/setSearchSuggestionsPhrase';
import submitSearch from 'Components/Navigator/actions/submitSearch';

/**
 * Map state to props.
 * @param {Object} state The application state.
 * @return {Object} Enriched component props.
 */
const mapStateToProps = state => ({
  searchPhrase: getSearchSuggestionsPhrase(state),
  suggestions: getCurrentSearchSuggestions(state),
  isFetching: isFetchingCurrentSearchSuggestions(state),
});

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  fetchSearchSuggestions: () => dispatch(fetchSearchSuggestions()),
  setSearchPhrase: searchPhrase => dispatch(setSearchSuggestionsPhrase(searchPhrase)),
  submitSearch: () => dispatch(submitSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps);
