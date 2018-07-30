import { createSelector } from 'reselect';

/**
 * @param {Object} state The global state.
 * @return {Object}
 */
export const getToastState = state => state.toast;

/**
 * Gets toast message which should be shown.
 * Always the first one, and always just one.
 * There should be only one toast message at a time shown to the user.
 * If selector returns null, toast drawer should be hidden.
 * @param {Object} state State of the app.
 * @returns {Object|null}
 */
export const getToast = createSelector(
  getToastState,
  (toastState) => {
    if (!toastState || !toastState.toasts || !toastState.toasts.length) {
      return null;
    }

    return toastState.toasts[0];
  }
);

/**
 * Checks if there is a toast message which should be shown.
 * @param {Object} state State of the app.
 * @returns {Object|null}
 */
export const hasNextToast = createSelector(
  getToastState,
  (toastState) => {
    if (!toastState || !toastState.toasts || !toastState.toasts.length) {
      return false;
    }

    return (toastState.toasts.length > 1);
  }
);

/**
 * Returns the dismissed flag of the toast state
 * @returns {boolean}
 */
export const isDismissed = createSelector(
  getToastState,
  toast => toast.dismissed
);
