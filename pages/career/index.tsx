import Container from '../../components/Container';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import CareerTimeline from './CareerTimeline';

export default function Career() {
  return (
    <Container>
      <PageHeader 
        pageTitle="Career History"  
        title="Career History"
        subtitleOne="currently working as"
        subtitleTwo="junior full stack developer @verto"
      />
      <CareerTimeline />
      <Footer 
        middleLink="contact"
      />
    </Container>
  )
}
