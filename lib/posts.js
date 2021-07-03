import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import images from 'remark-images'

const postsDirectory = path.join(process.cwd(), 'posts'); 

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory); 
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName); 
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    
    return {
      id,
      ...matterResult.data
    }
  })

  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}


export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .use(images)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id, 
    contentHtml, 
    ...matterResult.data
  }
}