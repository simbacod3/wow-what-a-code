
// TODO - implement the useDataInjection composable
// use this url to get your data from a json source:
// https://jsonkeeper.com/b/34CU

export const useDataInjection = () => {

  const response = fetch("https://www.jsonkeeper.com/b/34CU");
  console.log('response', response)


  const experiences = () => {}
  const getDetailsById = () => {}

  return {
    experiences,
    getDetailsById,
  }
}
