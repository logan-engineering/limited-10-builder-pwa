export function getFullProductTitle (product) {
  let title = product.title;

  while (product.parent) {
    product = product.parent;
    title = `${product.title}.${title}`;
  }
  return title;
}
