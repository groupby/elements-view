 # SF-X Product Component

```html
<sfx-product product="{}"></sfx-product>
```

The product component will display information about a given product.

## Functionality 

The component takes one `product` attribute (please refer [here](#) (@todo Link to TSDoc) to the format of the product object).

```js
{     
  "name": "Product Name",
  "price": 3.55,
  "productUrl": "http://url",
  "imageSrc": "http://url",
  "imageAlt": "Alternative image text"
}
```

## Customizations

Optionally the product can use `variants` to display different information based on what variant is selected. The format to use variants can be found [here](#). (@todo Link to TSDoc)

```js
{
  ...
  "variants": {
    "type": "text" // default, can be either "text", "image", "color"
    "items": [
      { 
        "text": "Variant Label", 
        "product": {
          // Info that will be overwritten in the product component
        }
      }
    ]
  }
}
```

The `image`, `variants`, `title` and `price` can be changed using slots. 

> **Any properties that are not identified in the ProductModel, will be rendered as additional `<span>` tags in the component.**


## Testing

The test suite for this component is contained in /packages/web-components/@sfx/product/test.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```

- To run the tests and watch the `src` and `test` directories to rerun the tests after any changes:

```sh
yarn tdd
```
