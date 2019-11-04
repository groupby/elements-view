import { storiesOf } from '@storybook/html';
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs';
import {
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_RESPONSE,
  SAYT_PRODUCTS_REQUEST,
  SAYT_PRODUCTS_RESPONSE,
  SAYT_HIDE,
  SAYT_SHOW,
  AutocompleteResponsePayload,
} from '@groupby/elements-events';
import '../src';
import {
  generateAutocompleteResultsEvent,
  generateSaytProductsResponseEvent,
  getSaytProductsResponseEvent,
  getDisplayCode,
  autocompleteResults,
  hidePrompt,
  StorybookCustomEvent,
} from '../../../../../.storybook/common';

const saytNotesMarkdownIntro = ` # GroupBy Elements SAYT Component

[Package README](https://github.com/groupby/elements-view/tree/master/packages/web-components/%40elements/sayt "GroupBy Elements SAYT README").

\`\`\`html
<gbe-sayt
  closetext="×"
  showclosebutton
  visible
></gbe-sayt>
\`\`\`

## Demonstrated in this story`;

function getSayt(searchbox: string = '', group?: string): string {
  const closeText = text('Close link text', '×');
  const showCloseButton = boolean('Show Close button', true) ? 'showclosebutton' : '';
  const hideAutocomplete = boolean('Hide Autocomplete', false) ? 'hideAutocomplete' : '';
  const hideProducts = boolean('Hide Products', false) ? 'hideProducts' : '';
  const minSearchLength = number('Min search length', 5);

  return (
    /* eslint-disable prefer-template */
    '<gbe-sayt\n'
    + (searchbox ? `  searchbox="${searchbox}"\n` : '')
    + (group ? `  group="${group}"\n` : '')
    + `  closetext="${closeText}"\n`
    + (showCloseButton ? `  ${showCloseButton}\n` : '')
    + (hideAutocomplete ? `  ${hideAutocomplete}\n` : '')
    + (hideProducts ? `  ${hideProducts}\n` : '')
    + `  minsearchlength="${minSearchLength}"\n`
    + '></gbe-sayt>'
    /* eslint-enable prefer-template */
  );
}

const generateSaytHideEvent = function getSaytHide(group = ''): StorybookCustomEvent {
  return {
    name: SAYT_HIDE,
    payload: {
      group,
    },
  };
};

const generateSaytShowEvent = function getSaytShow(group = ''): StorybookCustomEvent {
  return {
    name: SAYT_SHOW,
    payload: {
      group,
    },
  };
};

const autocompleteDataReceivedEvent = new CustomEvent<AutocompleteResponsePayload>(AUTOCOMPLETE_RESPONSE, {
  detail: {
    results: autocompleteResults,
  },
  bubbles: true,
});

function generateBaseData(): void {
  setTimeout(() => {
    window.dispatchEvent(autocompleteDataReceivedEvent);
  }, 0);
  setTimeout(() => {
    window.dispatchEvent(getSaytProductsResponseEvent());
  }, 0);
}

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    generateBaseData();
    const sayt = getSayt();
    return `
    <style>
      .display-code {
        position: absolute;
        top: 800px;
        z-index: -1;
      }
    </style>

    ${sayt}
    <div class="display-code">
    ${getDisplayCode(sayt)}
    </div>`;
  }, {
    notes: {
      markdown: `
        ${saytNotesMarkdownIntro}

          ### The GB Elements SAYT component populated with autocomplete and products data.
          * The SAYT component is designed to render different data in response to events, however, this story generates the data on page load. This is done in order to see the visual component immediately.
          * For stories that demonstrate the component's functionality, visit three stories listed below this one, under "SAYT".
      `,
    },
  })
  .add(
    'Rendering based on events and attributes',
    () => {
      hidePrompt(SAYT_HIDE);
      const sayt = getSayt();
      return `
      <style>
        .display-code {
          position: absolute;
          top: 800px;
          z-index: -1;
        }
        gbe-sayt {
          background-color: white;
        }
      </style>

      ${sayt}
      <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      <div class="display-code">
      ${getDisplayCode(sayt)}
      </div>`;
    },
    {
      customEvents: [
        generateSaytProductsResponseEvent(3),
        generateAutocompleteResultsEvent(),
        generateSaytHideEvent(),
        generateSaytShowEvent(),
      ],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          ### The GB Elements SAYT component will render the Autocomplete component with the payload of the \`${AUTOCOMPLETE_RESPONSE}\`, in response to the event.

            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RESPONSE}\` event.
              2. Click "emit".
              3. See the SAYT component update with the autocomplete data.


          ### The SAYT component will render the GB Elements Products component with the payload of the \`${SAYT_PRODUCTS_RESPONSE}\`, in response to the event.
            * To emit the event in this story:
              1. Visit the **Custom Events** tab and locate the \`${SAYT_PRODUCTS_RESPONSE}\` event.
              2. Click "emit".
              3. See the SAYT component update with the products data.


          ### The SAYT component will display itself in response to the \`${SAYT_SHOW}\` event, and hide itself in response to the \`${SAYT_HIDE}\` event.
            * To emit the events in this story:
              1. Visit the **Custom Events** tab.

                If SAYT is currently visible, locate the \`${SAYT_HIDE}\` event.

              2-a. Click "emit".

              3-a. Observe the SAYT component close.

                If SAYT is currently hidden, locate the \`${SAYT_SHOW}\` event.

              2-b. Click "emit".

              3-b. Observe the SAYT component open.


          ### The SAYT component will close when there is a click anywhere outside of the input box or SAYT itself.
            * To demonstrate in this story:
                1. Open SAYT with one of the methods outlined above.
                2. Click the area below SAYT.
                3. Observe SAYT component close.


          ### The SAYT component rendered based on the attributes defined on the element.
            * The component allows for customization via the inclusion of the following attributes:
              * \`hideAutocomplete\`
              * \`hideProducts\`
              * \`closeText\`
              * \`minSearchLength\`
                * **Note**: to observe the impact of modifying this attribute, it is necessary to add an event listener to listen for either the \`${AUTOCOMPLETE_REQUEST} \`or \`${SAYT_PRODUCTS_REQUEST}\` events. These events will trigger when the number of characters typed into the input box is equal to or greater than the number defined in the attribute.
            * To modify these attributes:
              1. Visit the **Knobs** tab and click any of the "Hide Autocomplete", "Hide Products", and "Show Close button'", and/or update the text contained within the "Close link text" field.
              2. Emit the appropriate events
              3. Observe the component render based on the attributes defined.


          ### The SAYT component will overlap any html behind it.
            * To demonstrate in this story:
              1. Open SAYT with one of the methods outlined above.
              2. Observe the message on the page
      `,
      },
    }
  )
  .add(
    'SAYT with simple search input',
    () => {
      hidePrompt(SAYT_HIDE);
      const input = '<input type="text" id="search-box" placeholder="Search here" />';
      const sayt = getSayt('search-box');

      return `
      <style>
        .search-container {
          float: left;
          position: relative;
          width: 100%;
        }
        #search-box {
          width: 100%;
        }
        .display-code {
          position: absolute;
          top: 800px;
          z-index: -1;
        }
        gbe-sayt {
          background-color: white;
        }
      </style>

      <div class="search-container">
        ${input}
        ${sayt}
      </div>
      <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      <div class="display-code">
      ${getDisplayCode(`${input}\n${sayt}`)}
      </div>
    `;
    },
    {
      customEvents: [
        generateSaytProductsResponseEvent(3),
        generateAutocompleteResultsEvent(),
        generateSaytHideEvent(),
        generateSaytShowEvent(),
      ],
      notes: {
        markdown: `
        ${saytNotesMarkdownIntro}

          ### The GB Elements SAYT component can work with a standard input element instead of a GB Elements Search Box component.
            * The component will not close when clicking within the input element or anywhere within the SAYT component.
            * To demonstrate in this story:
              1. Open SAYT, click the input element.
              2. Observe that the SAYT component remains open.


          ### Example of the SAYT component with a standard input element


      \`\`\`html
      <input type="text" id="search-box" placeholder="Search here" />
      <gbe-sayt
        searchbox="search-box"
        closetext="×"
        showclosebutton
        visible
      ></gbe-sayt>
      \`\`\`

          ### The SAYT component paired with a searchbox is navigable using the arrow keys.
            * The autocomplete selection can be changed by pressing the Up and Down arrow keys in the paired searchbox.
            * To demonstrate in this story:
              1. Visit the **Custom Events** tab and locate the \`${AUTOCOMPLETE_RESPONSE}\` event.
              2. Click "emit".
              3. Click in the searchbox.
              4. Press the Up and Down arrow keys.
              5. Observe that the autocomplete selection changes.


          ### The SAYT component paired with a searchbox component will be accessible.
            * Setting the \`searchbox\` attribute with the \`id\` of a valid text input will create a link between the elements.
            * The SAYT component will set aria attributes for \`aria-expanded\`, \`aria-haspopup\`, and \`role\` on the searchbox.
            * Additionally, if the SAYT component is using the GB Elements Autocomplete component (default), it will also set \`aria-activedescendant\` and \`aria-controls\` on the searchbox.
            * The example html snippet from above will be rendered as such when the SAYT component is open:

              \`\`\`html
              <input
                type="text
                id="search-box"
                aria-controls="gbe-sayt-nGuekzlz-autocomplete"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-activedescendant="gbe-autocomplete-IiDNFBKrd-item-1"
              />
              <gbe-sayt
                searchbox="search-box"
                closetext="×"
                showclosebutton
                visible
              >
                ...
                <gbe-autocomplete
                  data-gbe-ref="autocomplete"
                  id="gbe-sayt-nGuekzlz-autocomplete"
                  role="listbox"
                  selectedindex="1"
                >
                  <ul>
                    <li role="option" id="gbe-autocomplete-IiDNFBKrd-item-0" aria-selected="false">...</li>
                    <li role="option" id="gbe-autocomplete-IiDNFBKrd-item-1" aria-selected="true">...</li>
                    ...
                  </ul>
                </gbe-autocomplete>
                ...
              </gbe-sayt>
              \`\`\`
      `,
      },
    }
  )
  .add(
    'SAYT with multiple search inputs',
    () => {
      hidePrompt(SAYT_HIDE);
      const input1 = '<input type="text" id="search-box1" placeholder="Search here" />';
      const input2 = '<input type="text" id="search-box2" placeholder="Or search here" />';
      const sayt1 = getSayt('search-box1', 'group1');
      const sayt2 = getSayt('search-box2', 'group2');

      return `
      <style>
        .search-container {
          float: left;
          position: relative;
          width: 50%;
        }
        #search-box1, #search-box2 {
          width: 100%;
        }
        .display-code {
          position: absolute;
          top: 800px;
          z-index: -1;
        }
        gbe-sayt {
          background-color: white;
        }
      </style>

      <div class="sayt-container">
        <div class="search-container">
          ${input1}
          ${sayt1}
        </div>
        <div class="search-container">
          ${input2}
          ${sayt2}
        </div>
        <p class="prompt">Explore the <b>Custom Events</b> and <b>Knobs</b> tabs to render the component.</p>
      </div>
      <div class="display-code">
      ${getDisplayCode(`${input1}${sayt1}${input2}${sayt2}`)}
      </div>`;
    },
    {
      customEvents: [
        generateSaytProductsResponseEvent(3, 'group1'),
        generateAutocompleteResultsEvent('group1'),
        generateSaytProductsResponseEvent(3, 'group2'),
        generateAutocompleteResultsEvent('group2'),
        generateSaytHideEvent('group1'),
        generateSaytShowEvent('group1'),
        generateSaytHideEvent('group2'),
        generateSaytShowEvent('group2'),
      ],
      notes: {
        markdown: `
          ${saytNotesMarkdownIntro}

            ### Two GB Elements SAYT components act independently when mulitple SAYT components are included on a page, if the \`group\` attribute is set.
              * A click on one SAYT component will result in the other SAYT closing.
              * To demonstrate in this story:
                1. Open both SAYTs.
                2. Click anywhere within one SAYT component.
                3. Observe that the other SAYT component is closed.

              * A click on the close button on a given SAYT will close both SAYTs because:
                * You have closed the SAYT for which you have clicked close.
                * The other SAYT has closed due to lost focus.
                * To demonstrate in this story:
                  1. Open both SAYTs.
                  2. Click on one of the close buttons.
                  3. Observe that both SAYT components are closed.


              ### Example of multiple SAYT components

      \`\`\`html
      <input type="text" id="search-box1" placeholder="Search here" />
      <gbe-sayt
        searchbox="search-box1"
        group="group1"
        closetext="×"
        showclosebutton
        visible
      ></gbe-sayt>
      <input type="text" id="search-box2" placeholder="Search here" />
      <gbe-sayt
        searchbox="search-box2"
        group="group2"
        closetext="×"
        showclosebutton
        visible
      ></gbe-sayt>
      \`\`\`
        `,
      },
    }
  );
