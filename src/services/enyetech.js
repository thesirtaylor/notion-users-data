export function data() {
  return fetch("https://api.enye.tech/v1/challenge/records", {
    method: "GET",
    // mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
}
