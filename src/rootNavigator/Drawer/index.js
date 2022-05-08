import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContainer from '../../containers/CustomDrawerContainer';
import {DrawerStack} from '../Stacks';

const Drawer = createDrawerNavigator();

export default DrawerNav = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContainer {...props} />}
    drawerType="slide"
    openByDefault={false}
    drawerStyle={{width: '80%'}}
    overlayColor="transparent">
    <Drawer.Screen name="DrawerStacks" component={DrawerStack} />
  </Drawer.Navigator>
);
