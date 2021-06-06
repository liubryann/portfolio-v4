import Head from 'next/head'
import Header from '../components/Header';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Container>
        <Hero />
        <Footer label="view more" />
      </Container>
    </div>
  )
}
