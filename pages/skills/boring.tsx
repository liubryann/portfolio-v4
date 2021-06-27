import Container from "../../components/Container";
import Footer from "../../components/Footer";
import BoringStuff from './BoringStuff';

export default function Boring() {
  return (
    <Container>
      <BoringStuff />
      <Footer 
        middleLink="../career" 
      />
    </Container>
  )
}
