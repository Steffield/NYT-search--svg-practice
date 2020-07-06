const logo = document.querySelectorAll("#logo path");

console.log(logo);

// to make my css easier, loop through letters to get letter length

for (let i = 0; i < logo.length; i++) {
  console.log(
    `#logo path:nth-child(${i + 1}){ stroke-dasharray: ${Math.round(
      logo[i].getTotalLength()
    )}; stroke-dashoffset: ${Math.round(
      logo[i].getTotalLength()
    )}; animation: line-anim 2s ease forwards ${(i + 1) / 5}s;}`
  );
}
