import { Carousel } from '@mantine/carousel';
import { notifications } from '@mantine/notifications';
import classes from '../../../styles/Home.module.css';
import { Container, Title, ActionIcon, Group, Text } from '@mantine/core';
import { useRef } from 'react';
import autoplay from 'embla-carousel-autoplay';  // Adjust the import
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from "mantine-datatable";
import { useState, useEffect } from "react";
import checkLoggedInUser from '@/components/Layout/auth/ceklogin';
import { useRouter } from 'next/router';
import CustomCard from '@/components/Layout/card';
import { IconEye } from "@tabler/icons-react";
import { useQuerySaveeh } from '@/features/home/service';

export function UserDashboard({ user }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = checkLoggedInUser();
    if (!user) {
      notifications.show({
        color: 'red',
        title: '⚠Oops!',
        message: 'You are not signed in yet, please signin first',
      })
      router.push("/signin");
    }
  }, []);

// Gunakan fungsi-fungsi tersebut sesuai kebutuhan

  

  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
 
  const onHandleChangePage = (page) => {
    const from = (page - 1) * 10;
    setPage(page)
    setSkip(from)
  }
  const { data, isFetching } = useQuerySaveeh(skip);
  console.log (data, isFetching );

  useEffect(() => {
    const user = checkLoggedInUser();
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(user);
      console.log('userInfo:', user);
    }
  }, []);
  


  const autoplayInstance = useRef(autoplay({ delay: 4000 }));  // Adjust the initialization

  return (
    <div className={classes.hero1}>
      <Container className={classes.container1} size="fluid" style={{ margin: 0, padding: 0 }}>
        <Carousel 
          plugins={[autoplayInstance.current]}  // Adjust the reference
          onMouseEnter={autoplayInstance.current.stop}
          onMouseLeave={autoplayInstance.current.reset}
          slideSize="100%" 
          height="50vw"
          align="center"
          controlsOffset="md" 
          controlSize="4vw"
          loop
        >
          <Carousel.Slide>
            <img
              src="https://i.ibb.co/dc8QrV6/1.png"
              alt="Gambar 1"
              className={classes.fullscreenImage}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://i.ibb.co/KL1wCKZ/3.png"
              alt="Gambar 2"
              className={classes.fullscreenImage}
              style={{ width: '100%', height: '150%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://i.ibb.co/cNTw7YR/2.png"
              alt="Gambar 3"
              className={classes.fullscreenImage}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
          {/* Add more Carousel.Slide components with your content */}
        </Carousel>
        <Container>
        <main>
      <Title m={12.5}>Explore Vehicles</Title>
      <section>
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
  {data && data.data && data.data.saveh.length > 0 ? (
    data.data.saveh.map((item) => (
      <CustomCard key={item.id} data={item} />
    ))
  ) : (
    <Text>No data</Text>
  )}
  </div>
</section>
    </main>
        </Container>
      </Container>
    </div>
  );
}
