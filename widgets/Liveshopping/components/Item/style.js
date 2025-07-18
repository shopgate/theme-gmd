import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const pane = {
  width: '50%',
  background: colors.light,
};

const image = css({
  ...pane,
}).toString();

const infoPane = css({
  ...pane,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}).toString();

const infoPanePagination = css({
  paddingBottom: 0,
}).toString();

const priceGrid = css({
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  marginTop: variables.gap.small,
}).toString();

const priceStriked = css({
  fontSize: '0.875rem',
}).toString();

const price = css({
  color: `var(--color-primary, ${colors.primary})`,
  fontSize: '1.25rem',
  lineHeight: 1,
}).toString();

const card = {
  margin: '5px 15px 10px',
};

const linkPagination = css({
  paddingBottom: 28,
}).toString();

const title = css({
  fontWeight: '500',
  lineHeight: 1.15,
  marginTop: 1,
  marginBottom: variables.gap.small * 0.5,
}).toString();

const timer = css({
  fontSize: '0.875rem',
  color: `var(--color-primary, ${colors.primary})`,
  fontStyle: 'italic',
  fontWeight: 500,
}).toString();

const badgesPortal = css({
  width: '50%',
  '@media(min-width: 480px)': {
    position: 'initial',
    top: 'initial',
    left: 'initial',
    width: 'initial',
    marginBottom: 8,
    paddingLeft: 0,
  },
}).toString();

export default {
  image,
  infoPane,
  infoPanePagination,
  priceGrid,
  priceStriked,
  price,
  card,
  linkPagination,
  title,
  timer,
  badgesPortal,
};
