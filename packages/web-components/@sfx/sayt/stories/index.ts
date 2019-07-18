import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const showAttribute = boolean('show', false) ? 'show' : '';

    return `
      <sfx-sayt
        ${ showAttribute }
      ></sfx-sayt>
    `
  }
  , {
    notes: {
      markdown: `
        # Search As You Type (SAYT)
        Hardcoded
        
        Here is the documentation for the SAYT component.
      `
    } 
  })
  .add('Receiving sayt_hide events and sayt_show ', () => {
    setTimeout(() => {
      window.dispatchEvent(new Event('sfx::sayt_show'));
    }, 3000);

    setTimeout(() => {
      window.dispatchEvent(new Event('sfx::sayt_hide'));
    }, 6000);

    return `
      <sfx-sayt></sfx-sayt>
    `
  }, {
    notes: {
      markdown:`
        # Search As You Type (SAYT)
        - Receiving sayt_hide event after 3 seconds.
        - Receiving sayt_show event after 6 seconds.
      `
    }
  })
