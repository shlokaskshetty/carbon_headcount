import React, { useState } from 'react';
import {
  HeaderContainer,
  Header,
  SkipToContent,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink,
  HeaderSideNavItems,
} from '@carbon/react';
import { UserAvatar, Switcher, Search, Notification, Fade } from '@carbon/icons-react';
import { Link } from 'react-router-dom';

const CarbonHeader = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
  };

  
  return (
    <HeaderContainer
      render={({ onClickSideNavExpand }) => (
        <Header aria-label="IBM Platform Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={() => {
              onClickSideNavExpand();
              toggleSideNav();
            }}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName  prefix="IBM">
            Headcount
          </HeaderName>
          
          <HeaderGlobalBar>
          
            <HeaderGlobalAction
              aria-label="App Switcher"
              
              tooltipAlignment="end"
              href="/"
            >
              <Switcher size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded} 
            onOverlayClick={onClickSideNavExpand}
             onSideNavBlur={onClickSideNavExpand}
            isRail
          >
            <SideNavItems>
             
              <SideNavLink renderIcon={Fade} as={Link} to="/home">
                Home
              </SideNavLink>
              <SideNavLink renderIcon={Fade} as={Link} to="/emppage">
                BluePage
              </SideNavLink>
              <SideNavLink renderIcon={Fade} as={Link} to="/dashboard">
              Dashboard
              </SideNavLink>

            </SideNavItems>
          </SideNav>
        </Header>
      )}
    />
  );
};

export default CarbonHeader;