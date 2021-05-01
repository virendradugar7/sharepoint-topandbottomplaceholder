import * as React from 'react'
import ISiteNavigationProps from '../interfaces/ISiteNavigationProps'
import { IButtonStyles, IconButton, INavLinkGroup, initializeIcons } from '@fluentui/react'
import { useBoolean } from '@uifabric/react-hooks'
import styles from './styles.module.scss'
import { ISpfxw2State } from '../interfaces/ISpfxw2State';
import { ContextualMenuItemType, IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useConst } from '@fluentui/react-hooks';
import {BaseButton, Dropdown, IDropdownOption,SearchBox} from 'office-ui-fabric-react'
import {operations} from "../Services copy/Services";
import { ISpfxw2Props } from '../ISpfxw2Props';
var menuProps:any={};
class Navigation extends React.Component<any,ISpfxw2State, {}>{
    public op:operations;
    public selectedtitle:string;

        constructor(props:any){
            super(props);
            this.op=new operations();
            this.state={optionslist:[]};
          }
         
     

  
        
          public getListTitle=(event:any,data:any)=>{
            this.selectedtitle=data.text;
              }
              public componentDidMount(){
                this.op.GetAllList(this.props.context).then((result:IDropdownOption[])=>{
                 // this.setState({optionslist:result});
               
                });
                this.op.nav_items(this.props.context).then((result:any)=>{
                    
               this.setState({optionslist:result});

              })};

//     public styles: any = {
//         parent:{
//             width:'50%',
//             height:'50%',
// backgroundColor: 'red',
//         },
//         dropdown: {
//             marginleft:'100px',
//             width:'50%',
//           },
//         root: {
//             color: 'white',
//             backgroundColor: '#0078d4',
//             borderRadius: '50%',
//             padding: '25px',
//             position: 'fixed',
//             right: '40px',
//             zIndex: '1000',
//             bottom: '20px'
//         },
//         rootHovered: {
//             backgroundColor: '#005a9e',
//             color: 'white',
//         }
//     }
    public render(): React.ReactElement<ISpfxw2Props> {
    return (
        <div className={styles.parent} >
        
        <Dropdown options={this.state.optionslist}  className={styles.dropdown} onChange={this.getListTitle} placeholder="quick navigation"></Dropdown>

        </div>
    )
}
}

export default Navigation
