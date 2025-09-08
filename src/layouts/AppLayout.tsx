import { Anchor, AppShell, AppShellHeader, AppShellMain, Box, Group } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AppLayout() {
  const location = useLocation();

  const links = [
    // { label: 'Home', to: '/home' },
    { label: 'Monsters', to: '/monsters' },
    { label: 'Spells', to: '/spells' },
    { label: 'Features', to: '/features' },
    { label: 'Characters', to: '/characters' },
  ];

  const showNav = links.some((link) => location.pathname === link.to);

  return (
    <AppShell header={showNav ? { height: 60 } : undefined} padding="md">
      {showNav && (<AppShellHeader>

        <Box px="md" h="100%" display="flex" style={{ display: 'flex', alignItems: 'center' }}>
          <Group gap="md">
            {links.map((link) => (
              <Anchor
                key={link.to}
                component={Link}
                to={link.to}
                underline="never"
                fw={location.pathname === link.to ? 700 : 400}
                c={location.pathname === link.to ? 'blue' : 'gray'}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>
        </Box>
      </AppShellHeader>)}

      <AppShellMain>
        <Outlet />
      </AppShellMain>
      <Analytics />
    </AppShell>
  );
}
