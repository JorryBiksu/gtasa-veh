// components/Card.js
import { Card, Image, Title, Text } from '@mantine/core';

const CustomCard = ({ data }) => {
  return (
    <Card shadow="sm" style={{ maxWidth: 300 }}>
      <Image
        src={data.image} // Ganti dengan properti gambar yang sesuai dari data Anda
        alt={data.name} // Ganti dengan properti nama yang sesuai dari data Anda
        fit="cover"
        width={256}
      />
      <Title order={3}>{data.name}</Title>
      <Text>{data.category}</Text>
      <Text>{data.description}</Text>
      {/* Tambahan: Tambahkan elemen HTML atau komponen sesuai kebutuhan */}
    </Card>
  );
};

export default CustomCard;
