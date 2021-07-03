import Container from '../../components/Container';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import BlogList from './BlogList';
import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

export default function Blog({ allPostsData }) {
  return (
    <Container>
      <PageHeader title="BLOG"  pageTitle="Blog" />
      <BlogList allPostsData={allPostsData} />
      <Footer />
    </Container>
  )
}
