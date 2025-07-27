import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Image,
  Card,
  Text,
  SimpleGrid,
  Group,
  Badge,
  Button,
} from "@mantine/core";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7200/api/movies") // <-- update to your API URL
      .then((res) => res.json())
      .then((data) => setMovies(data.items))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Title order={1} my="md">
        🎬 Movies
      </Title>
      <br />
      <SimpleGrid cols={3} spacing="lg">
        {movies.slice(0, 3).map((movie) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder key={movie.id}>
            <Card.Section>
              <Image
                src="https://picsum.photos/200"
                height={160}
                alt="Norway"
              />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{movie.title}</Text>
              <Badge color="pink">{movie.yearOfRelease}</Badge>
            </Group>

            <Text c="dimmed" size="sm">
              Genres: {movie.genres.join(", ")}
            </Text>

            <Button
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              component="a"
              href={`https://localhost:7200/api/movies/${movie.id}`}
              target="_blank"
            >
              Click here for more details
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
