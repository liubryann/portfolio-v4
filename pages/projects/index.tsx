import Container from '../../components/Container';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import globalStyles from '../../styles/styles.module.scss';
import styles from './projects.module.scss';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import useWindowSize from '../../lib/hooks/window-size';

export default function Project() {
  const isMobile = useWindowSize();

  return (
    <Container>
      <PageHeader 
        title="DUE DILLIGENCE FOR DUMMIES" 
        subtitleOne="featured project"
        subtitleTwo="stock sentiment analysis"
       />
       { isMobile ? "mobile" : "not mobile"}
       <div className={`${styles.imageWrapper} `}>
         <Image
            src="/images/ddd.png"
            width={1200}
            height={600}
            layout-="intrinsic"
            className="animate__animated animate__fadeInUp"
          />
       </div>
    <Footer middleLink="skills" rightLabel="learn more" rightLink="https://github.com/liubryann/ddd"/>
    </Container>
  )
}
