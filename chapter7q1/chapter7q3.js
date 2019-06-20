const array = ["kawasaki", "suzuki", "toyota", "subaru", "honda"]

car1 = 0;
car2 = 0;
car3 = 0;
car4 = 0;
car5 = 0;

for (let i = 0; i < 1000; i++) {
  const brand = array[Math.floor(Math.random() * array.length)];
  switch(brand) {
    case "kawasaki":
      car1 += 1;
      break;
    case "suzuki":
      car2 += 1;
      break;
    case "toyota":
      car3 += 1;
      break;
    case "subaru":
      car4 += 1;
      break;
    case "honda":
      car5 += 1;
      break;
  }
}

console.log(`kawasaki: ${car1 * 100 / 1000}%`);
console.log(`suzuki: ${car2 * 100 / 1000}%`);
console.log(`toyota: ${car3 * 100 / 1000}%`);
console.log(`subaru: ${car4 * 100 / 1000}%`);
console.log(`honda: ${car5 * 100 / 1000}%`);
