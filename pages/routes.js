import Loadable from 'react-loadable';

export const StartPage = Loadable({
  loader: () => import('./StartPage'),
  loading: () => null,
});

export const Page = Loadable({
  loader: () => import('./Page'),
  loading: () => null,
});

export const RootCategory = Loadable({
  loader: () => import('./RootCategory'),
  loading: () => null,
});

export const Category = Loadable({
  loader: () => import('./Category'),
  loading: () => null,
});

// Export const Filter = Loadable({
//   Loader: () => import('./Filter'),
//   Loading: () => null,
// });

// Export const FilterAttribute = Loadable({
//   Loader: () => import('./FilterAttribute'),
//   Loading: () => null,
// });

export const Product = Loadable({
  loader: () => import('./Product'),
  loading: () => null,
});

// Export const ProductGallery = Loadable({
//   Loader: () => import('./ProductGallery'),
//   Loading: () => null,
// });

// Export const Reviews = Loadable({
//   Loader: () => import('./Reviews'),
//   Loading: () => null,
// });

export const Cart = Loadable({
  loader: () => import('./Cart'),
  loading: () => null,
});

// Export const Favorites = Loadable({
//   Loader: () => import('./Favorites'),
//   Loading: () => null,
// });

// Export const Search = Loadable({
//   Loader: () => import('./Search'),
//   Loading: () => null,
// });

export const Login = Loadable({
  loader: () => import('./Login'),
  loading: () => null,
});

// Export const Orders = Loadable({
//   Loader: () => import('./Orders'),
//   Loading: () => null,
// });

// Export const WriteReview = Loadable({
//   Loader: () => import('./WriteReview'),
//   Loading: () => null,
// });
