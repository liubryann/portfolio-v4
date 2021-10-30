import { getPostData, getAllPostIds } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import Date from "../../lib/components/Date";
import PostComments from "../../components/PostComment";
import globalStyles from '../../styles/styles.module.scss';
import styles from './post.module.scss';

export const getStaticProps: GetStaticProps = async({ params }) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Container>
      <PageHeader title={postData.title} pageTitle={postData.title} subtitleOne={<Date dateString={postData.date} />}/>
      <article className={styles.postWrapper}>
        <div className={`${globalStyles.contentPadding} ${styles.content}`} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <div className={`${globalStyles.contentPadding} ${styles.comments}`}>
        <PostComments postTitle={postData.title} postDate={postData.date}/>
      </div>
      <Footer />
    </Container>
  )
}
