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

const useQuickStart = true;
const customerId = 'apparel';
let core;

if (useQuickStart) {
  core = GbElementsLogic.quickStart({
    customerId: customerId,
    productTransformer: productTransformer,
  });
} else {
  // init core and plugins
  core = new GbElementsLogic.Core();
  const cachePlugin = new GbElementsLogic.CachePlugin();
  const cacheDriverPlugin = new GbElementsLogic.CacheDriverPlugin();
  const domEventsPlugin = new GbElementsLogic.DomEventsPlugin();
  const saytPlugin = new GbElementsLogic.SaytPlugin({ subdomain: customerId });
  const saytDriverPlugin = new GbElementsLogic.SaytDriverPlugin({ productTransformer: productTransformer });
  const searchPlugin = new GbElementsLogic.SearchPlugin({ customerId: customerId });
  const searchDriverPlugin = new GbElementsLogic.SearchDriverPlugin({ productTransformer: searchProductTransformer });
  // register all plugins with core
  core.register([cachePlugin, cacheDriverPlugin, saytPlugin, saytDriverPlugin, domEventsPlugin, searchPlugin, searchDriverPlugin]);
}

[
  'gbe::cache_request',
  'gbe::sayt_products_response',
  'gbe::search_request',
  'gbe::search_response',
  'gbe::sayt_products_error',
  'gbe::update_search_term',
].forEach(function(eventName) {
  window.addEventListener(eventName, function(event) {
    console.log(event.type, event.detail);
  });
});
