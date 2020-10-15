export function getItems(count = 20) {
  return Array.from({ length: count }, (v, k) => {
    const r = Math.random() + 0.5;
    const t = Date.now();
    return {
      id: `${t}-${k}-${r}`,
      aspectRatio: r,
      color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`,
    };
  });
}

export async function asyncGetItems(count = 20, delay = 1000) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });

  return getItems(count);
}
