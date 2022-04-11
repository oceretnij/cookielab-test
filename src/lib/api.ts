export const API_URL = 'https://private-51cc74-interviewtask1.apiary-mock.com';

export async function fetchAPI(path: string) {
  let data = undefined;
  
  await fetch(API_URL + path, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response: any) => {
    data = response.json();
  }).catch((error: any) => {
    console.log(error);
  });

  return data;
}
