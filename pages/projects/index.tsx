import Container from '../../components/Container';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import FeaturedProject from '../../components/FeaturedProject';

export default function Project() {
  return (
    <Container>
      <PageHeader 
        pageTitle="Featured Projects"
        title="DUE DILLIGENCE FOR DUMMIES" 
        subtitleOne="featured project"
        subtitleTwo="stock sentiment analysis"
      />
      <FeaturedProject />
      <Footer middleLink="skills" rightLabel="learn more" rightLink="https://github.com/liubryann/ddd"/>
    </Container>
  )
}
