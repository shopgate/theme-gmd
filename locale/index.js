/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// The fallback language if no file is available for the designated language.
const defaultLanguage = 'en-US';
const availableLanguages = [
  'de-DE',
  'en-US',
];

// Determine the correct language file name
const filename = availableLanguages.includes(process.env.LANG) ? process.env.LANG : defaultLanguage;

// eslint-disable-next-line import/no-dynamic-require
const translations = require(`./${filename}.json`);

export default translations;
