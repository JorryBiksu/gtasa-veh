import { Carousel } from '@mantine/carousel';
import classes from '../../../styles/Home.module.css';
import { Container, Title } from '@mantine/core';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { deleteProduct, getProducts } from "@/common/query/product";
import Layout from "@/components/Layout";
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataTable } from "mantine-datatable";
import { useState } from "react";

export function UserDashboard() {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  
  return (
    <div className={classes.hero1}>
      <Container className={classes.container1} size="fluid" style={{ margin: 0, padding: 0 }}>
        <Carousel 
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          slideSize="100%" 
          height="50vw"  // Set a relative height using viewport units
          align="center"
          controlsOffset="md" 
          controlSize="4vw"  // Set a relative control size using viewport units
          loop
        >
          <Carousel.Slide>
            <img
              src="https://i0.wp.com/gomechanic.in/blog/wp-content/uploads/2022/10/Turismo.jpg?resize=1000%2C506&ssl=1"
              alt="Gambar 1"
              className={classes.fullscreenImage}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://i0.wp.com/gomechanic.in/blog/wp-content/uploads/2022/10/Turismo.jpg?resize=1000%2C506&ssl=1"
              alt="Gambar 2"
              className={classes.fullscreenImage}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <img
              src="https://i0.wp.com/gomechanic.in/blog/wp-content/uploads/2022/10/Turismo.jpg?resize=1000%2C506&ssl=1"
              alt="Gambar 3"
              className={classes.fullscreenImage}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Carousel.Slide>
          {/* Add more Carousel.Slide components with your content */}
        </Carousel>
        <Container>
        <main>
          <section 
            style={{
              display:"flex", 
              justifyContent:"space-between",
              alignItems:"center"
            }}>
            <h1>Explore Vehicles</h1>
          </section>
          <section>
            <DataTable
              withBorder
              minHeight={180}
              columns={[
                {
                  accessor: 'title',
                  title: 'Title',
                  width: 160,
                },
                {
                  accessor: 'category',
                  title: 'Category',
                  width: 160,
                },
                {
                  accessor: 'description',
                  title: 'Description',
                  width: 160,
                },
              ]}
            />
          </section>
        </main>
        </Container>
      </Container>
    </div>
  );
}
