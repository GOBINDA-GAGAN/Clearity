export const genCoolUserNameWithEmoji = (): string => {
  const adjectives = [
    "Swift", "Silent", "Mighty", "Bright", "Crazy", "Epic", "Flying", "Shadow", "Neon", "Magic"
  ];
  const nouns = [
    "Tiger", "Falcon", "Phoenix", "Ninja", "Wizard", "Dragon", "Wolf", "Samurai", "Rocket", "Lion"
  ];
  const emojis = ["😎", "🔥", "🚀", "🌟", "💀", "⚡", "🐉", "🦄", "🤖", "🌈"];

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 1000); 
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return `${randomAdj}${randomNoun}${randomNum}${randomEmoji}`;
}
