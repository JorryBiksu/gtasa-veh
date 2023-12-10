import { Container, Group, Anchor } from '@mantine/core';
import Link from 'next/link';
import classes from '../../styles/FooterSimple.module.css';

const links = [
  { link: '/about', label: 'About' },
  { link: '/dashboard', label: 'Vehicles' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
      
      <Group className={classes.samp}>
            <Link href="https://www.sa-mp.mp" style={{textDecoration: 'none', color: 'gray'}}>SA-MP Link</Link>
        </Group>
        <Group className={classes.links}>{items}</Group>
        <Group className={classes.cp}>
            <Link href="https://github.com/JorryBiksu" style={{textDecoration: 'none', color: 'gray'}}>Copyright ©2023 JorryBiksu</Link>
        </Group>
        
      </Container>
    </div>
  );
}
