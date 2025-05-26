export function parseVoiceCommand(text, userRole) {
  text = text.toLowerCase();

  if (userRole === 'buyer') {
    // Matches: "add 2 palestine cap to cart", "add a palestine cap to cart", "add palestine cap to cart"
    const addMatch = text.match(/add\s+(?:(\d+)|a|an)?\s*([\w\s]+?)(?:\s+to\s+(cart|card))?$/);
    const buyMatch = text.match(/(?:buy|purchase|order)\s+(?:(\d+)|a|an)?\s*([\w\s]+)$/);
    if (addMatch) {
      return {
        intent: 'add_to_cart',
        quantity: addMatch[1] ? +addMatch[1] : 1,
        product: addMatch[2].trim()
      };
    }
    if (buyMatch) {
      return {
        intent: 'add_to_cart',
        quantity: buyMatch[1] ? +buyMatch[1] : 1,
        product: buyMatch[2].trim()
      };
    }
  }

  return { intent: 'unknown' };
}