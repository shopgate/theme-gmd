import { connect } from 'react-redux';
import { getSearchPhrase } from '@shopgate/pwa-common/selectors/history';
import { getSearchSuggestionsPhrase } from '@shopgate/pwa-common-commerce/search/selectors';
import toggleNavSearchField from 'Components/Navigator/actions/toggleNavSearchField';
import submitSearch from 'Components/Navigator/actions/submitSearch';
import setSearchPhrase from './actions/setSearchPhrase';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  searchPhrase: getSearchSuggestionsPhrase(state) || getSearchPhrase(state) || '',
});

/**
 * Maps action dispatchers to the component props.
 * @param {function} dispatch The store dispatcher.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  setSearchPhrase: query => dispatch(setSearchPhrase(query)),
  submitSearch: () => dispatch(submitSearch()),
  toggleSearch: active => dispatch(toggleNavSearchField(active)),
});

export default connect(mapStateToProps, mapDispatchToProps);
