export default async function Page() {
  const data = await getData();

  return <>test {JSON.stringify(data)}</>;
}

async function getData() {
  const response = await fetch("http://127.0.0.1:3001/test", {
    cache: "no-cache",
  });
  return response.json();
}
