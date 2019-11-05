import { XmlEntities } from 'html-entities';
import {
  AUTOCOMPLETE_RESPONSE,
  SAYT_PRODUCTS_RESPONSE,
  SEARCH_RESPONSE,
  AutocompleteResultGroup,
  AutocompleteSearchTermItem,
  Product,
  SaytProductsResponsePayload,
} from '@groupby/elements-events';

const entities = new XmlEntities();

export function getDisplayCode(code: string): string {
  return `
      <style>
        #the-code {
          position: block;
          bottom: 0;
        }
        pre.code-output {
          font-size: 12px;
          padding: 15px;
          background-color: #EEEEEE;
        }
      </style>
      <div id="the-code">
        <h3>The code</h3>
        <pre class="code-output"><code>${entities.encode(code)}</code></pre>
      </div
    `;
}

export function getSampleProducts(): Product[] {
  return [
    {
      title: 'Best Shoe',
      price: 39.99,
      label: 'New Product',
      promo: '25% off',
      imageSrc:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
      imageAlt: 'A spicy red shoe',
      info: 'Info 1',
      info2: 'Info 2',
      variants: {
        type: 'color',
        items: [
          {
            color: '#c00',
            text: 'Red',
            product: {
              imageSrc:
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
              imageAlt: 'A spicy red shoe'
            }
          },
          {
            color: '#28e',
            text: 'Blue',
            product: {
              imageSrc:
                'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
              imageAlt: 'Sonic blue, gotta go fast'
            }
          }
        ]
      }
    },
    {
      title: 'Greatest Shoe',
      price: 49.99,
      label: 'Classic Product',
      promo: '25% off',
      imageSrc:
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-1.2.1&auto=format&fit=crop&h=350&q=80',
      imageAlt: 'A classic blue shoe'
    }
  ];
}

export function getProducts(quantity: number): Product[] {
  const products = [];
  const sampleProducts = getSampleProducts();
  for (let i = 0; i < quantity; i++) {
    const randomIndex = Math.floor(Math.random() * sampleProducts.length);
    products.push(sampleProducts[randomIndex]);
  }
  return products;
}

export const autocompleteResults: AutocompleteResultGroup<AutocompleteSearchTermItem>[] = [
  {
    title: '',
    items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
  },
  {
    title: 'Brands',
    items: [{ label: 'Kashi' }, { label: 'Excel' }]
  },
  {
    title: 'Colors',
    items: [{ label: 'Teal' }, { label: 'Orange' }, { label: 'Fuschia' }]
  }
];

export const generateAutocompleteResultsEvent = (group?: string): StorybookCustomEvent => {
  return {
    name: AUTOCOMPLETE_RESPONSE,
    payload: {
      results: autocompleteResults,
      group,
    }
  }
}

export const generateSaytProductsResponseEvent = (productCount: number, group?: string): StorybookCustomEvent => {
  return {
    name: SAYT_PRODUCTS_RESPONSE,
    payload: {
      products: getProducts(productCount),
      group,
    }
  }
}

export const generateSearchResponseEvent = (productCount: number, group?: string): StorybookCustomEvent => {
  return {
    name: SEARCH_RESPONSE,
    payload: {
      results: {
        records: getProducts(productCount)
      },
      group,
    }
  }
}

export function getSaytProductsResponseEvent(): CustomEvent<SaytProductsResponsePayload<Product>> {
  return new CustomEvent(SAYT_PRODUCTS_RESPONSE, {
    detail: {
      products: getProducts(5),
      originalResponse: {
        area: "Production",
        availableNavigation: [{name: "categories.3", displayName: "Sub Category", type: "Value", refinements: [{type: "Value", count: 616, value: "Women"}], metaData: []}],
        biasingProfile: "BaseTest",
        correctedQuery: "",
        debugInfo: {
          rawRequest: "",
          rawResponse: "",
          rawAggregationsRequest: "",
          rawAggregationsResponse: "",
        },
        didYouMean: ["pan", "panty", "paint"],
        errors: "",
        id: "69fb538a-83e1-44ef-ad2e-edfe5e46d4e5",
        matchStrategy: {rules: []},
        metadata: {cached: true, recordLimitReached: false, totalTime: 3},
        originalQuery: "pants",
        originalRequest: {query: "pants", skip: 0, pageSize: 10, fields: [], pruneRefinements: true},
        pageInfo: {recordStart: 1, recordEnd: 10},
        query: "pants",
        records: [],
        redirect: "",
        relatedQueries: [],
        rewrites: [],
        selectedNavigation: [],
        siteParams: [],
        template: {ruleName: "none", name: "default", zones: {}},
        totalRecordCount: 2451,
        warnings: "",
      } as any,
    },
    bubbles: true
  });
}

export function hidePrompt(event) {
  window.addEventListener(event, e => {
    let prompt: HTMLElement = document.querySelector('.prompt');
    prompt.style.display = 'none';
  });
}

export interface StorybookCustomEvent {
  name: string;
  payload: any;
}
