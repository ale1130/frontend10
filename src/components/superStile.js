import React from 'react';

function Megastile(array){

  const Stile = `
  :root {
    --color1: ${array["colore1"]};
    --color2: ${array["colore2"]};
    --color3: ${array["colore3"]};
    --color4: ${array["colore4"]};
    --color5: ${array["colore5"]};
    --color6: ${array["colore6"]};
    --color7: ${array["colore7"]};
    --color8: ${array["colore8"]};
    --color9: ${array["colore9"]};
    --color10: ${array["colore10"]};
    --color11: ${array["colore11"]};
    --color12: ${array["colore12"]};
    --color13: ${array["colore13"]};
    --color14: ${array["colore14"]};
    --color15: ${array["colore15"]};
    --color16: ${array["colore16"]};
    --color17: ${array["colore17"]};
    --color18: ${array["colore18"]};
    --color19: ${array["colore19"]};
    --color20: ${array["colore20"]};
  }
  `;

  return Stile;
}

export {Megastile}