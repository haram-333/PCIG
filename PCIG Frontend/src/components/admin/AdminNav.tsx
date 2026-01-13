import { useState, useEffect } from 'react';
import { 
  Bell, 
  User,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';

export default function AdminNav() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isMobileOrTablet = isMobile || isTablet;
  const location = useLocation();
  
  // Ensure location.pathname is always defined
  const currentPath = location?.pathname || window.location.pathname;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [workflowHover, setWorkflowHover] = useState(false);
  const [workflowDropdownPosition, setWorkflowDropdownPosition] = useState({ top: 0, left: 0 });
  const [operationsHover, setOperationsHover] = useState(false);
  const [operationsDropdownPosition, setOperationsDropdownPosition] = useState({ top: 0, left: 0 });
  const [payoffsHover, setPayoffsHover] = useState(false);
  const [payoffsDropdownPosition, setPayoffsDropdownPosition] = useState({ top: 0, left: 0 });
  const [paymentsHover, setPaymentsHover] = useState(false);
  const [paymentsDropdownPosition, setPaymentsDropdownPosition] = useState({ top: 0, left: 0 });
  const [administrationHover, setAdministrationHover] = useState(false);
  const [administrationDropdownPosition, setAdministrationDropdownPosition] = useState({ top: 0, left: 0 });
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  // Main navigation items
  const mainNavItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/properties', label: 'Properties Workflow Hub' },
    { path: '/admin/investors/management', label: 'Investors Management' },
    { path: '/admin/payments', label: 'Payments' },
    { path: '/admin/reo-leased', label: 'REO Leased Module' },
    { path: '/admin/operations/surplus-funds-research', label: 'Surplus Funds Research' },
    { path: '/admin/payoffs/owner-portal', label: 'Owner Payoff Portal (public)' },
    { path: '/admin/administration/reports-center', label: 'Reports Center' },
  ];

  // Sub-navigation items
  const workflowHubSubNavItems = [
    { path: '/admin/properties/fifa-import', label: 'FIFA Import' },
    { path: '/admin/properties/parcel-research', label: 'Parcel Research' },
    { path: '/admin/properties/fifa-processing', label: 'FIFA Processing' },
    { path: '/admin/properties/sheriff-workflow', label: 'Sheriff Workflow' },
    { path: '/admin/properties/redemption-tracking', label: 'Redemption Tracking' },
    { path: '/admin/properties/barment', label: 'Barment' },
    { path: '/admin/properties/quiet-title', label: 'Quiet Title' },
    { path: '/admin/properties/reo-disposition', label: 'REO Disposition' },
  ];

  const paymentsSubNavItems = [
    { path: '/admin/payments', label: 'Payments' },
    { path: '/admin/investors/fund-admin', label: 'Fund Admin' },
    { path: '/admin/asset-transactions', label: 'Asset Transactions' },
  ];

  const operationsSubNavItems = [
    { path: '/admin/operations/surplus-funds-research', label: 'Surplus Funds Research' },
    { path: '/admin/operations/property-tax-appeal', label: 'Property Tax Appeal' },
    { path: '/admin/operations/expense-input-allocation', label: 'Expense Input + Share Allocation' },
    { path: '/admin/operations/time-tracking', label: 'Time Tracking & Worker Hours' },
    { path: '/admin/operations/notice-letters', label: 'Notice Letters' },
    { path: '/admin/operations/efile-cancellations', label: 'eFile Cancellations' },
  ];

  const payoffsSubNavItems = [
    { path: '/admin/payoffs/owner-portal', label: 'Owner Payoff Portal (public)' },
    { path: '/admin/payoffs/lawyer-portal', label: 'Lawyer Payoff Portal (public)' },
    { path: '/admin/payoffs/queue', label: 'Payoff Request Queue (Admin)' },
  ];

  const administrationSubNavItems = [
    { path: '/admin/administration/reports-center', label: 'Reports Center' },
    { path: '/admin/administration/import-center', label: 'Import Center' },
    { path: '/admin/administration/audit-log', label: 'Audit Log' },
    { path: '/admin/administration/settings', label: 'Settings (Admin)' },
    { path: '/admin/administration/user-management', label: 'User Management' },
    { path: '/admin/administration/calendar-deadline', label: 'Calendar & Deadline Engine' },
    { path: '/admin/administration/notifications-escalation', label: 'Notifications & Escalation System' },
    { path: '/admin/administration/county-state-config', label: 'City/County/State Configuration' },
  ];

  // Auto-expand the active item's sub-nav in mobile view
  useEffect(() => {
    if (isMobileOrTablet) {
        const activeItem = mainNavItems.find(item => {
        const isActive = currentPath === item.path || 
          (item.label === 'Properties Workflow Hub' && currentPath.startsWith('/admin/properties')) ||
          (item.label === 'Investors Management' && currentPath.startsWith('/admin/investors/management')) ||
          (item.label === 'Payments' && (currentPath.startsWith('/admin/payments') || currentPath.startsWith('/admin/investors/fund-admin') || currentPath.startsWith('/admin/asset-transactions'))) ||
          (item.label === 'REO Leased Module' && currentPath.startsWith('/admin/reo-leased')) ||
          (item.label === 'Surplus Funds Research' && currentPath.startsWith('/admin/operations')) ||
          (item.label === 'Owner Payoff Portal (public)' && currentPath.startsWith('/admin/payoffs')) ||
          (item.label === 'Reports Center' && currentPath.startsWith('/admin/administration'));
        return isActive;
      });
      
        if (activeItem) {
        // Check if any sub-nav item is active
        let hasActiveSubNav = false;
        if (activeItem.label === 'Properties Workflow Hub') {
          hasActiveSubNav = workflowHubSubNavItems.some(subItem => 
            currentPath === subItem.path || 
            (subItem.path.includes('?') && currentPath === subItem.path.split('?')[0])
          );
        } else if (activeItem.label === 'Payments') {
          hasActiveSubNav = paymentsSubNavItems.some(subItem => 
            currentPath === subItem.path || 
            (subItem.path.includes('?') && currentPath === subItem.path.split('?')[0])
          );
        } else if (activeItem.label === 'Surplus Funds Research') {
          hasActiveSubNav = operationsSubNavItems.some(subItem => 
            currentPath === subItem.path || 
            (subItem.path.includes('?') && currentPath === subItem.path.split('?')[0])
          );
        } else if (activeItem.label === 'Owner Payoff Portal (public)') {
          hasActiveSubNav = payoffsSubNavItems.some(subItem => 
            currentPath === subItem.path || 
            (subItem.path.includes('?') && currentPath === subItem.path.split('?')[0])
          );
        } else if (activeItem.label === 'Reports Center') {
          hasActiveSubNav = administrationSubNavItems.some(subItem => 
            currentPath === subItem.path || 
            (subItem.path.includes('?') && currentPath === subItem.path.split('?')[0])
          );
        }
        
        if (hasActiveSubNav || currentPath.startsWith(activeItem.path)) {
          setExpandedMobileItem(activeItem.label);
        }
      }
    }
  }, [currentPath, isMobileOrTablet]);

  // Helper function to create dropdown nav item
  const createDropdownItem = (
    _hoverState: boolean,
    setHoverState: (val: boolean) => void,
    _positionState: { top: number; left: number },
    setPositionState: (pos: { top: number; left: number }) => void,
    subNavItems: Array<{ path: string; label: string; isActive?: boolean }>
  ) => {
    const item = mainNavItems.find(navItem => {
      if (navItem.label === 'Properties Workflow Hub') return subNavItems === workflowHubSubNavItems;
      if (navItem.label === 'Payments') return subNavItems === paymentsSubNavItems;
      if (navItem.label === 'Surplus Funds Research') return subNavItems === operationsSubNavItems;
      if (navItem.label === 'Owner Payoff Portal (public)') return subNavItems === payoffsSubNavItems;
      if (navItem.label === 'Reports Center') return subNavItems === administrationSubNavItems;
      return false;
    });
    
    if (!item) return null;

    const isActive = currentPath === item.path || 
      (item.label === 'Properties Workflow Hub' && currentPath.startsWith('/admin/properties')) ||
      (item.label === 'Payments' && (currentPath.startsWith('/admin/payments') || currentPath.startsWith('/admin/investors/fund-admin') || currentPath.startsWith('/admin/asset-transactions'))) ||
      (item.label === 'Surplus Funds Research' && currentPath.startsWith('/admin/operations')) ||
      (item.label === 'Owner Payoff Portal (public)' && currentPath.startsWith('/admin/payoffs')) ||
      (item.label === 'Reports Center' && currentPath.startsWith('/admin/administration'));

    return (
      <div
        key={item.path}
        style={{
          position: 'relative',
          display: 'inline-block'
        }}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPositionState({
            top: rect.bottom + 8,
            left: rect.left
          });
          setHoverState(true);
        }}
        onMouseLeave={() => setHoverState(false)}
      >
        <Link 
          to={item.path} 
          style={{ 
            fontSize: isActive ? '16px' : '14px', 
            fontWeight: isActive ? 600 : 500, 
            color: isActive ? '#1E3A5F' : '#64748B', 
            textDecoration: 'none',
            borderBottom: isActive ? '2px solid #1E3A5F' : 'none',
            paddingBottom: isActive ? '4px' : '0',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          {item.label}
          <ChevronDown style={{ width: '14px', height: '14px' }} />
        </Link>
      </div>
    );
  };

  // Helper function to render dropdown popup
  const renderDropdown = (
    hoverState: boolean,
    position: { top: number; left: number },
    setHoverState: (val: boolean) => void,
    subNavItems: Array<{ path: string; label: string; isActive?: boolean }>
  ) => {
    if (!hoverState || isMobileOrTablet) return null;
    return (
      <div
        style={{
          position: 'fixed',
          top: `${position.top}px`,
          left: `${position.left}px`,
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          minWidth: '220px',
          zIndex: 1001,
          padding: '8px 0',
          overflow: 'hidden'
        }}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        {subNavItems.map((subItem) => {
          const isSubItemActive = currentPath === subItem.path || 
            (subItem.path.includes('?') && currentPath === subItem.path.split('?')[0]);
          return (
            <Link
              key={subItem.path}
              to={subItem.path}
              onClick={() => setHoverState(false)}
              style={{
                display: 'block',
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: isSubItemActive ? 600 : 500,
                color: isSubItemActive ? '#1E3A5F' : '#64748B',
                textDecoration: 'none',
                backgroundColor: isSubItemActive ? '#EFF6FF' : 'transparent',
                transition: 'all 0.15s ease',
                borderLeft: isSubItemActive ? '3px solid #1E3A5F' : '3px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!isSubItemActive) {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.color = '#1E3A5F';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubItemActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#64748B';
                }
              }}
            >
              {subItem.label}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Global Top Navigation Bar */}
      <div style={{ 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid #E2E8F0',
        padding: `12px clamp(16px, 4vw, 48px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        width: '100%',
        boxSizing: 'border-box',
        margin: 0,
        left: 0,
        right: 0
      }}>
        {/* Left Side - Logo and Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: `clamp(12px, 2vw, 32px)`, flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: `clamp(16px, 1.5vw, 20px)`, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', flexShrink: 0 }}>TaxDeedInvest</div>
          
          {/* Desktop Nav */}
          {!isMobileOrTablet && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: `clamp(12px, 1.5vw, 20px)`, flexWrap: 'wrap', overflowX: 'auto', flex: 1 }}>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#475569', 
                backgroundColor: '#F1F5F9',
                padding: '4px 10px',
                borderRadius: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}>ADMIN</span>
              {mainNavItems.map((item) => {
                const isActive = currentPath === item.path || 
                  (item.label === 'Properties Workflow Hub' && currentPath.startsWith('/admin/properties')) ||
                  (item.label === 'Investors Management' && currentPath.startsWith('/admin/investors/management')) ||
                  (item.label === 'Payments' && (currentPath.startsWith('/admin/payments') || currentPath.startsWith('/admin/investors/fund-admin') || currentPath.startsWith('/admin/asset-transactions'))) ||
                  (item.label === 'REO Leased Module' && currentPath.startsWith('/admin/reo-leased')) ||
                  (item.label === 'Surplus Funds Research' && currentPath.startsWith('/admin/operations')) ||
                  (item.label === 'Owner Payoff Portal (public)' && currentPath.startsWith('/admin/payoffs')) ||
                  (item.label === 'Reports Center' && currentPath.startsWith('/admin/administration'));

                if (item.label === 'Properties Workflow Hub') {
                  return createDropdownItem(
                    workflowHover,
                    setWorkflowHover,
                    workflowDropdownPosition,
                    setWorkflowDropdownPosition,
                    workflowHubSubNavItems
                  );
                }
                if (item.label === 'Payments') {
                  return createDropdownItem(
                    paymentsHover,
                    setPaymentsHover,
                    paymentsDropdownPosition,
                    setPaymentsDropdownPosition,
                    paymentsSubNavItems
                  );
                }
                if (item.label === 'Surplus Funds Research') {
                  return createDropdownItem(
                    operationsHover,
                    setOperationsHover,
                    operationsDropdownPosition,
                    setOperationsDropdownPosition,
                    operationsSubNavItems
                  );
                }
                if (item.label === 'Owner Payoff Portal (public)') {
                  return createDropdownItem(
                    payoffsHover,
                    setPayoffsHover,
                    payoffsDropdownPosition,
                    setPayoffsDropdownPosition,
                    payoffsSubNavItems
                  );
                }
                if (item.label === 'Reports Center') {
                  return createDropdownItem(
                    administrationHover,
                    setAdministrationHover,
                    administrationDropdownPosition,
                    setAdministrationDropdownPosition,
                    administrationSubNavItems
                  );
                }
                return (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    style={{ 
                      fontSize: isActive ? '16px' : '14px', 
                      fontWeight: isActive ? 600 : 500, 
                      color: isActive ? '#1E3A5F' : '#64748B', 
                      textDecoration: 'none',
                      borderBottom: isActive ? '2px solid #1E3A5F' : 'none',
                      paddingBottom: isActive ? '4px' : '0',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Side - User and Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: `clamp(8px, 1.5vw, 16px)`, flexShrink: 0 }}>
          <button style={{ 
            padding: '8px', 
            borderRadius: '6px', 
            border: 'none', 
            backgroundColor: 'transparent',
            cursor: 'pointer',
            position: 'relative',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell style={{ width: `clamp(18px, 1.5vw, 20px)`, height: `clamp(18px, 1.5vw, 20px)`, color: '#64748B' }} />
          </button>
          
          {/* Mobile/Tablet Menu Button */}
          {isMobileOrTablet && (
            <button
              onClick={() => setDrawerOpen(true)}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Menu style={{ width: `clamp(20px, 2vw, 24px)`, height: `clamp(20px, 2vw, 24px)`, color: '#64748B' }} />
            </button>
          )}
          
          <div style={{ 
            width: `clamp(36px, 3vw, 40px)`, 
            height: `clamp(36px, 3vw, 40px)`, 
            borderRadius: '50%', 
            backgroundColor: '#EFF6FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <User style={{ width: `clamp(20px, 2vw, 24px)`, height: `clamp(20px, 2vw, 24px)`, color: '#1E3A5F' }} />
          </div>
        </div>
      </div>

      {/* Dropdown Popups - Outside Navbar, Overlays Page Content */}
      {renderDropdown(workflowHover, workflowDropdownPosition, setWorkflowHover, workflowHubSubNavItems)}
      {renderDropdown(paymentsHover, paymentsDropdownPosition, setPaymentsHover, paymentsSubNavItems)}
      {renderDropdown(operationsHover, operationsDropdownPosition, setOperationsHover, operationsSubNavItems)}
      {renderDropdown(payoffsHover, payoffsDropdownPosition, setPayoffsHover, payoffsSubNavItems)}
      {renderDropdown(administrationHover, administrationDropdownPosition, setAdministrationHover, administrationSubNavItems)}

      {/* Mobile Drawer */}
      {drawerOpen && isMobileOrTablet && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            style={{
              width: '80%',
              maxWidth: '320px',
              backgroundColor: '#FFFFFF',
              height: '100%',
              padding: `clamp(16px, 2vh, 24px)`,
              overflowY: 'auto',
              boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: `clamp(20px, 3vh, 32px)` }}>
              <div style={{ fontSize: `clamp(18px, 2.2vw, 22px)`, fontWeight: 700, color: '#0F172A' }}>Menu</div>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X style={{ width: `clamp(20px, 2vw, 24px)`, height: `clamp(20px, 2vw, 24px)`, color: '#64748B' }} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: `clamp(8px, 1.5vh, 12px)` }}>
              {mainNavItems.map((item) => {
                const isActive = currentPath === item.path || 
                  (item.label === 'Properties Workflow Hub' && currentPath.startsWith('/admin/properties')) ||
                  (item.label === 'Investors Management' && currentPath.startsWith('/admin/investors/management')) ||
                  (item.label === 'Payments' && (currentPath.startsWith('/admin/payments') || currentPath.startsWith('/admin/investors/fund-admin') || currentPath.startsWith('/admin/asset-transactions'))) ||
                  (item.label === 'REO Leased Module' && currentPath.startsWith('/admin/reo-leased')) ||
                  (item.label === 'Surplus Funds Research' && currentPath.startsWith('/admin/operations')) ||
                  (item.label === 'Owner Payoff Portal (public)' && currentPath.startsWith('/admin/payoffs')) ||
                  (item.label === 'Reports Center' && currentPath.startsWith('/admin/administration'));

                // Get sub-nav items for this main item
                const getSubNavItems = () => {
                  let subItems: Array<{ path: string; label: string }> = [];
                  if (item.label === 'Properties Workflow Hub') {
                    subItems = workflowHubSubNavItems;
                  } else if (item.label === 'Payments') {
                    subItems = paymentsSubNavItems;
                  } else if (item.label === 'Surplus Funds Research') {
                    subItems = operationsSubNavItems;
                  } else if (item.label === 'Owner Payoff Portal (public)') {
                    subItems = payoffsSubNavItems;
                  } else if (item.label === 'Reports Center') {
                    subItems = administrationSubNavItems;
                  }
                  return subItems;
                };

                const subNavItems = getSubNavItems();
                const hasSubNav = subNavItems.length > 0;
                const isExpanded = expandedMobileItem === item.label;

                return (
                  <div key={item.path}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => {
                          if (hasSubNav) {
                            setExpandedMobileItem(isExpanded ? null : item.label);
                          } else {
                            setDrawerOpen(false);
                          }
                        }}
                        style={{
                          fontSize: isActive ? '16px' : '14px',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? '#1E3A5F' : '#64748B',
                          textDecoration: 'none',
                          padding: '12px 16px',
                          borderRadius: '6px',
                          backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                          borderBottom: isActive ? '2px solid #1E3A5F' : 'none',
                          transition: 'all 0.2s ease',
                          flex: 1
                        }}
                      >
                        {item.label}
                      </Link>
                      {hasSubNav && (
                        <button
                          onClick={() => setExpandedMobileItem(isExpanded ? null : item.label)}
                          style={{
                            padding: '8px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#64748B'
                          }}
                        >
                          <ChevronDown 
                            style={{ 
                              width: '16px', 
                              height: '16px',
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease'
                            }} 
                          />
                        </button>
                      )}
                    </div>
                    {hasSubNav && isExpanded && (
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '4px',
                        paddingLeft: '16px',
                        marginTop: '4px',
                        marginBottom: '8px'
                      }}>
                        {subNavItems.map((subItem) => {
                          const isSubActive = currentPath === subItem.path || 
                            (subItem.path.includes('?') && currentPath === subItem.path.split('?')[0]);
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              onClick={() => setDrawerOpen(false)}
                              style={{
                                fontSize: '13px',
                                fontWeight: isSubActive ? 600 : 500,
                                color: isSubActive ? '#1E3A5F' : '#64748B',
                                textDecoration: 'none',
                                padding: '10px 16px',
                                borderRadius: '6px',
                                backgroundColor: isSubActive ? '#EFF6FF' : 'transparent',
                                borderLeft: isSubActive ? '3px solid #1E3A5F' : '3px solid transparent',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

