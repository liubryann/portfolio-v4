export default function BoringStuff() {
  function turnToList(list) {
    return list.map((listItem) => {
      return <li key={listItem}>{listItem}</li>
    })
  }

  const languages = ['Java', 'C', 'HTML', 'CSS']; 
  const languagesComponent = turnToList(languages);

  const databases = ['MongoDB', 'SQL', 'Cloud Firestore', 'Neo4j']
  const databasesComponent = turnToList(databases);

  const other = ['Git', 'SVN']
  const otherComponent = turnToList(other);

  return (
    <div>
      <h1>I made this page boring to lowlight the boring stuff</h1>
      <h4>Languages</h4>
      <ul>
        {languagesComponent}
      </ul>
      <h4>Database</h4>
      <ul>
        {databasesComponent}
      </ul>
      <h4>Other</h4>
      <ul>
        {otherComponent}
      </ul>
    </div>
  )
}
