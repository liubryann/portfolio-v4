import Container from '../../components/Container';
import PageHeader from '../../components/PageHeader';
import ContactInfo from './ContactInfo';
import Footer from '../../components/Footer';
import globalStyles from '../../styles/styles.module.scss';
import { BsHeartFill } from 'react-icons/bs';

export default function Contact() {
  const LeftFooter = () => <div className={globalStyles.navStyle}>made with <BsHeartFill size={11}/></div>

  return (
    <Container>
      <PageHeader 
        pageTitle="Contact"  
        title="Contact"
      />
      <ContactInfo />
      <Footer leftLabel={<LeftFooter />} rightLabel="source" rightLink="https://github.com/liubryann/portfolio-v4/"/>
    </Container>
  )
}
