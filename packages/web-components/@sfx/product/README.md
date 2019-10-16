 # SF-X Product Component

```html
<sfx-product product="{}"></sfx-product>
```

The product component will display information about a given product.

## Functionality

The component takes one `product` attribute (refer to the `ProductModel` instance for the data format).

```js
{
  "title": "Product Name",
  "price": 3.55,
  "productUrl": "http://example.com/img.jpg",
  "imageSrc": "http://example.com/img.jpg",
  "imageAlt": "Alternative image text"
}
```

## Customizations

Optionally the product can use `variants` to display different information based on what variant is selected (refer to the `ProductVariantsModel` instance for the data format).

```js
{
  "variants": {
    "type": "text" // default, can be either "text", "image", "color"
    "items": [
      {
        "text": "Variant Label",
        "product": {
          // Data that will be overwritten in the product component
        }
      }
    ]
  }
}
```


## Testing

The test suite for this component is contained in `test` directory.
To run the tests, navigate to this folder and use one of the following commands based on the desired testing flow:

- To run the tests once:

```sh
yarn test
```

- To run the tests and watch the `src` and `test` directories for changes:

```sh
yarn tdd
```
