import React from 'react';
import {
  SideNavMenuItem,
  HeaderName,
  Header,
  HeaderContainer,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';
import { Home, Settings, Information, Notification, UserAvatar, Switcher } from '@carbon/icons-react';
 import { Link } from 'react-router-dom';

const CarbonHeader = () => 
(
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Carbon Tutorial">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName  prefix="IBM">
           Headcount
        </HeaderName>
        
        <SideNav  aria-label="Side navigation" className="custom-sidenav">
    
    <SideNavItems className="nav-list">
 
    <SideNavMenuItem
      as={Link} to="/home"
        style={{ paddingLeft: '16px' }} 
      >
        Home
      </SideNavMenuItem>

         <SideNavMenuItem
         as={Link} to="/emppage"
        style={{ paddingLeft: '16px' }} 
      >
        BluePage SyncUp
      </SideNavMenuItem>


      <SideNavMenuItem
       as={Link} to="/dashboard"
        
        style={{ paddingLeft: '16px' }} 
      >
        Dashboard
      </SideNavMenuItem>

      
    </SideNavItems>
  </SideNav>
        <HeaderGlobalBar>
  
  <HeaderGlobalAction aria-label=" Logout" tooltipAlignment="center"  href="/">
    <UserAvatar size={25} />
  </HeaderGlobalAction>
 

  
</HeaderGlobalBar>
      </Header>
    )}
  />
  
  
);

export default CarbonHeader;





