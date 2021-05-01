import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import { sp } from '@pnp/sp/presets/all'
import * as ReactDom from 'react-dom';
import  Panel from './common.panel'
import { useBoolean } from '@fluentui/react-hooks';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import ISiteProps from './interfaces/ISiteProps'
import * as strings from 'CustomHeaderFooterApplicationCustomizerStrings';
import styles from './CustomHeaderFooterApplicationCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
const LOG_SOURCE: string = 'CustomHeaderFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomHeaderFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomHeaderFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICustomHeaderFooterApplicationCustomizerProperties> {

 // private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    sp.setup({
      spfxContext: this.context
    })
    // Added to handle possible changes on the existence of placeholders.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders.bind(this));
    
    // Call render method for generating the HTML elements.
    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    console.log('licationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
    this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));
    
    // Handling the top placeholder
    // if (!this._topPlaceholder) {
    //   this._topPlaceholder =
    //     this.context.placeholderProvider.tryCreateContent(
    //       PlaceholderName.Top,
    //       { onDispose: this._onDispose });
    
    //   // The extension should not assume that the expected placeholder is available.
    //   if (!this._topPlaceholder) {
    //     console.error('The expected placeholder (Top) was not found.');
    //     return;
    //   }
    
    //   if (this.properties) {
    //     let topString: string = this.properties.Top;
    //     if (!topString) {
    //       topString = '(Top property was not defined.)';
    //     }
    
    //     if (this._topPlaceholder.domElement) {
    //       this._topPlaceholder.domElement.innerHTML = `
    //         <div class="${styles.app}">
    //           <div class="ms-bgColor-themeDark ms-fontColor-white ${styles.top}">
    //             <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}
    //           </div>
    //         </div>`;
    //     }
    //   }
    // }
    
   // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });
    
      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }
    
      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = '(hello from bottom foooter.)';
        }
    
        if (this._bottomPlaceholder.domElement) {
         
          
          const element: React.ReactElement = React.createElement(
            Panel
          );
          ReactDom.render(element, this._bottomPlaceholder.domElement);
        }
      }
    }
   }

  private _onDispose(): void {
    console.log('[AlertApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
