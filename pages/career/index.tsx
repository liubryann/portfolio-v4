import Container from '../../components/Container';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import CareerTimeline from './CareerTimeline';

export default function Career() {
  return (
    <Container>
      <PageHeader 
        pageTitle="Career History"  
        title="CAREER HISTORY"
        subtitleOne="upcoming SDE intern @amazon"
      />
      <CareerTimeline />
      <Footer 
        middleLink="contact"
      />
    </Container>
  )
}
