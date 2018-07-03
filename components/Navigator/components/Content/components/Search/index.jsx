import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import SearchSuggestions from './components/SearchSuggestions';
import connect from './connector';
import styles from './style';
/**
 * The navigator search component.
 */
class Search extends Component {
  static propTypes = {
    active: PropTypes.bool,
    placeholder: PropTypes.string,
    searchPhrase: PropTypes.string,
    setSearchPhrase: PropTypes.func,
    submitSearch: PropTypes.func,
    toggleSearch: PropTypes.func,
  };

  static defaultProps = {
    active: true,
    placeholder: null,
    searchPhrase: '',
    setSearchPhrase: () => {},
    submitSearch: '',
    toggleSearch: () => {},
  };

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * The component constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.inputElement = null;
    this.state = {
      // Determines if this component is rendered
      active: false,
      // Value of the input element
      inputValue: '',
    };
  }

  /**
   * If the components active prop gets set to true,
   * set active state to true immediately.
   * @param {Object} nextProps The next component props.
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      // The search field just became active.
      if (nextProps.active) {
        // Get the current search phrase from the query params.
        const currentSearchPhrase = this.props.searchPhrase;

        this.setState(
          {
            active: true,
            inputValue: currentSearchPhrase,
          },
          // Auto-focus input element
          () => {
            this.inputElement.focus();
          }
        );
      }
    }
  }

  /**
   * Updates the search query.
   */
  updateQuery = () => {
    const { value } = this.inputElement;
    this.props.setSearchPhrase(value);
  };

  /**
   * Updates the search query after a debounced delay.
   */
  updateQueryDebounced = debounce(this.updateQuery, 250);

  /**
   * Handles inputs.
   */
  handleInput = () => {
    this.setState({
      inputValue: this.inputElement.value,
    });
    this.updateQueryDebounced();
  };

  /**
   * Sets cursor at the end of input on focus.
   */
  handleFocus = () => {
    this.inputElement.selectionStart = this.state.inputValue.length;
    this.inputElement.selectionEnd = this.state.inputValue.length;
  };

  /**
   * Handles blur events on the input element.
   */
  handleOverlayClick = () => {
    this.props.toggleSearch(false);
  };

  /**
   * Handles input submission.
   * @param {Event} event A submit event.
   */
  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.inputElement.value) {
      // Do not submit if the field is empty.
      return;
    }

    this.inputElement.blur();
    this.updateQuery();
    this.props.submitSearch();
  };

  /**
   * Sets the active state according to active prop
   * whenever an animation ends.
   */
  handleAnimationEnd = () => {
    this.setState({ active: this.props.active });
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    if (!this.state.active) {
      return null;
    }

    const containerClassName = classNames(
      styles.container,
      { [styles.animation.in]: this.props.active },
      { [styles.animation.out]: !this.props.active }
    );

    const { inputValue } = this.state;
    const { placeholder } = this.props;
    const { __ } = this.context.i18n();
    const inputPlaceholder = placeholder !== null ? placeholder : __('search.placeholder');

    return (
      <div>
        <form
          data-test-id="Search"
          className={containerClassName}
          onSubmit={this.handleSubmit}
          onAnimationEnd={this.handleAnimationEnd}
        >
          <input
            className={styles.input}
            type="search"
            value={inputValue}
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            placeholder={inputPlaceholder}
            ref={(element) => { this.inputElement = element; }}
            onFocus={this.handleFocus}
          />
          <div
            className={styles.overlay}
            onClick={this.handleOverlayClick}
            role="button"
            aria-hidden
          />
        </form>
        <SearchSuggestions phrase={this.state.inputValue} />
      </div>
    );
  }
}

export default connect(Search);
