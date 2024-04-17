import { Footer } from '@/components/footer';
import { Header } from '@/components/header/landing/header';
import { getSession } from '@/lib';
import axios from 'axios';

export default async function Home() {
  const posts = await axios.get('https://jsonplaceholder.typicode.com/todos');
  console.log(posts);

  const session = getSession();
  console.log(session);

  return (
    <div className="grid grid-cols-1 gap-8 min-h-screen">
      <Header />
      {JSON.stringify(session)}
      <p className="container">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rem quos,
        suscipit itaque adipisci tempore facilis est voluptatum corrupti
        voluptates aperiam delectus perferendis, atque asperiores eius minima
        non ea! Atque.
      </p>
      <p className="container">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga rem quos,
        suscipit itaque adipisci tempore facilis est voluptatum corrupti
        voluptates aperiam delectus perferendis, atque asperiores eius minima
        non ea! Atque.
      </p>

      <Footer />
    </div>
  );
}
