import Head from 'next/head'
import Header from '../components/Header';
import Container from '../components/Container';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
      <Container>
        <Hero />
        <Footer middleLabel="view more" middleLink="projects" />
      </Container>
  )
}
