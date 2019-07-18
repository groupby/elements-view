import { storiesOf } from '@storybook/html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import '../src/index.ts';

storiesOf('Components|SAYT', module)
  .addDecorator(withKnobs)
  .add('Default', () => {

    // setTimeout(() => {
    //   window.dispatchEvent(new Event('sayt_show'));
    // }, 2000);

    // setTimeout(() => {
    //   window.dispatchEvent(new Event('sayt_hide'));
    // }, 6000);
    const saytHideAttribute = boolean('hideSayt', true) ? 'hideSayt': '' 

    return `
      <sfx-sayt
        ${ saytHideAttribute }
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
});
