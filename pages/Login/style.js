import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { responsiveMediaQuery } from '@shopgate/engage/styles';
import { StylePresets } from '@shopgate/engage/components/Form';

const { colors, variables } = themeConfig;

const container = css({
  flexGrow: 1,
  padding: `${variables.gap.small * 3}px ${variables.gap.big}px`,
  [responsiveMediaQuery('>sm', { webOnly: true })]: {
    width: '50%',
  },
}).toString();

const headline = css({
  fontSize: '2.1875rem',
  lineHeight: 1,
  fontWeight: 500,
  [responsiveMediaQuery('>sm', { webOnly: true })]: {
    fontSize: '2rem',
    fontWeight: 'normal',
    paddingBottom: variables.gap.big,
  },
}).toString();

const subline = css({
  fontSize: '1.125rem',
  color: `var(--color-text-medium-emphasis, ${colors.shade6})`,
  marginBottom: variables.gap.big,
  marginTop: 4,
});

const form = css({
  paddingTop: variables.gap.big * 1.5,
  '--form-element-left-offset': '30px',
  [responsiveMediaQuery('>sm', { webOnly: true })]: {
    ...StylePresets.OUTLINED_FORM_FIELDS,
    ' .simpleInput': {
      paddingLeft: variables.gap.big,
    },
  },
});

const input = css({
  width: '100%',
  ' .label': {
    color: `var(--color-text-medium-emphasis, ${colors.shade6})`,
  },
  ' .simpleInput': {
    color: 'var(--color-text-high-emphasis)',
  },
}).toString();

const forgotWrapper = css({
  textAlign: 'right',
  fontSize: '0.75rem',
  marginTop: -variables.gap.big,
  marginBottom: variables.gap.big,
}).toString();

const buttonWrapper = css({
  paddingTop: variables.gap.big * 2,
  paddingBottom: variables.gap.big * 1.5,
}).toString();

const button = css({
  width: '100%',
}).toString();

const noAccount = css({
  marginRight: variables.gap.small * 0.5,
}).toString();

const signup = css({
  display: 'inline-block',
  color: `var(--color-primary, ${colors.primary}) !important`,
  width: 'auto',
  margin: '-.35em 0 -.35em -.35em',
  padding: '.35em',
}).toString();

const icon = css({
  fill: `var(--color-text-medium-emphasis, ${colors.shade6})`,
  width: '24px',
  height: '24px',
}).toString();

const iconLeft = css({
  marginRight: variables.gap.xsmall,
}).toString();

const iconRight = css({
  marginLeft: variables.gap.xsmall,
}).toString();

const toggleButton = css({
  padding: '4px',
  margin: '-4px 0',
}).toString();

export default {
  container,
  headline,
  subline,
  form,
  input,
  forgotWrapper,
  buttonWrapper,
  button,
  noAccount,
  signup,
  icon,
  iconLeft,
  iconRight,
  toggleButton,
};
