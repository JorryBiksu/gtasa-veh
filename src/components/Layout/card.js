// components/Card.js
import { Card, Image, Title, Text, Space, Button } from '@mantine/core';
import Link from 'next/link'; // Jika menggunakan React Router, pastikan untuk mengimpor Link

const CustomCard = ({ data }) => {
  return (
    <Card shadow="sm" style={{ maxWidth: 300, marginBottom: 16, margin: 10 }}>
      <Image
        src={data.image}
        alt={data.name}
        fit="cover"
        width={256}
      />
      <Title order={3}>{data.name}</Title>
      <Text>{data.category}</Text>
      <Text>{data.description}</Text>
      <Text>${data.price}</Text>

      {/* Tombol menuju form pesanan dengan ID mobil */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Link href={`/order?id=${data.id}`} passHref>
          <Button variant="transparent">
            Order Here »
          </Button>
        </Link>
      </div>

      {/* Tambahan: Tambahkan elemen HTML atau komponen sesuai kebutuhan */}
    </Card>
  );
};

export default CustomCard;
