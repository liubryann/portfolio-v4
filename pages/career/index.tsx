import Container from '../../components/Container';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import CareerTimeline from './CareerTimeline';

export default function Career() {
  return (
    <Container center>
      <div style={{ "marginRight": "auto"}}>
        <PageHeader 
          pageTitle="Career History"  
          title="CAREER HISTORY"
          subtitleOne="SDE @amazon"
        />
      </div>
      <CareerTimeline />
      <Footer 
        middleLink="contact"
      />
    </Container>
  )
}
