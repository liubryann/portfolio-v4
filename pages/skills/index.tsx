import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import FavouriteTech from "./FavouriteTech";


export default function Skills() {
  return (
    <Container>
      <PageHeader 
        pageTitle="Favourite Tech"  
        title="Favourite Tech"
      />
      <FavouriteTech />
      <Footer 
        middleLink="career" 
        rightLabel="boring tech" 
        rightLink="/skills/boring" 
      />
    </Container>
  )
}

