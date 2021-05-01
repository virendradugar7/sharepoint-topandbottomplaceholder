import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {BaseButton, Dropdown, IDropdownOption,SearchBox} from 'office-ui-fabric-react'
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as strings from 'CustomHeaderFooterApplicationCustomizerStrings';
import Navigation from './common/common.nav';
import ISiteNavigationProps from './interfaces/ISiteNavigationProps'
import styles from './CustomHeaderFooterApplicationCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISpfxw2Props } from './ISpfxw2Props';

const LOG_SOURCE: string = 'CustomHeaderFooterApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICustomHeaderFooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  //Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class CustomHeaderFooterApplicationCustomizer
  extends BaseApplicationCustomizer<ICustomHeaderFooterApplicationCustomizerProperties> {

    private _topPlaceholder: PlaceholderContent | undefined;
//  private _bottomPlaceholder: PlaceholderContent | undefined;
// operations.GetAllList(props.context).then((result:IDropdownOption[])=>{
//   optionslist=result;
// });

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Added to handle possible changes on the existence of placeholders.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders.bind(this));
    
    // Call render method for generating the HTML elements.
    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {
    let option:IDropdownOption[]=[]
    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
    this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));
    
    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });
    
      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }
    
      if (this.properties) {
        let topString: string = this.properties.Top;
        if (!topString) {
          topString = '(hello.)';
        }
    
        if (this._topPlaceholder.domElement) {
          const element: React.ReactElement<ISpfxw2Props> = React.createElement(
            Navigation,
            {
              context: this.context
            }
          );
          ReactDom.render(element, this._topPlaceholder.domElement);
        }
      }
    }
    
 
   }

  private _onDispose(): void {
    console.log('[AlertApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
