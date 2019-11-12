function parseRecord(record) {
  const data = record.allMeta;
  const visualVariants = data.visualVariants;
  const firstVariant = visualVariants[0];
  const nonvisualVariants = firstVariant.nonvisualVariants;
  if (!nonvisualVariants[0]) throw new Error('No nonvisual variants');

  return {
    data: data,
    firstVariant: firstVariant,
    nonvisualVariants: nonvisualVariants,
    visualVariants: visualVariants,
  };
}

function parseVariants(variants) {
  return variants.map(function(v) {
    return {
      color: v.standardColor,
      text: v.standardColor,
      image: v.swatchImage,
      product: { imageSrc: v.productImage, imageAlt: v.description, },
    };
  });
}

function productTransformer(record) {
  let filter;
  try {
    filter = parseRecord(record);
  } catch(error) {
    console.error(error);
    return;
  }
  const data = filter.data;
  const firstVariant = filter.firstVariant;
  const nonvisualVariants = filter.nonvisualVariants;
  const visualVariants = filter.visualVariants;

  const transfomedProduct = {
    title: data.title,
    price: nonvisualVariants[0].retailPrice,
    imageSrc: firstVariant.productImage,
    imageAlt: data.title,
    productUrl: firstVariant.productImage,
  };

  if (visualVariants.length > 1) {
    transfomedProduct.variants = {
      type: 'image',
      items: parseVariants(visualVariants),
    };
  }

  return transfomedProduct;
}

function searchProductTransformer(record) {
  return {
    label: record.title,
    price: record.allMeta.visualVariants[0].nonvisualVariants[0].retailPrice,
  };
}

// init core and plugins
const core = new GbElementsCore.Core();
const cachePlugin = new GbElementsPlugins.CachePlugin();
const cacheDriverPlugin = new GbElementsPlugins.CacheDriverPlugin();
const domEventsPlugin = new GbElementsPlugins.DomEventsPlugin();
const saytPlugin = new GbElementsPlugins.SaytPlugin({ subdomain: 'apparel' });
const saytDriverPlugin = new GbElementsPlugins.SaytDriverPlugin({ productTransformer: productTransformer });
const searchPlugin = new GbElementsPlugins.SearchPlugin({ customerId: 'apparel' });
const searchDriverPlugin = new GbElementsPlugins.SearchDriverPlugin({ productTransformer: searchProductTransformer });
// register all plugins with core
core.register([cachePlugin, cacheDriverPlugin, saytPlugin, saytDriverPlugin, domEventsPlugin, searchPlugin, searchDriverPlugin]);
// let cacheResponse = /(gbe::cache_response)/gim;
[
  'gbe::cache_request',
  'gbe::sayt_products_response',
  'gbe::sayt_products_error',
].forEach(function(eventName) {
  window.addEventListener(eventName, function(event) {
    console.log(event.type, event.detail);
  });
});
