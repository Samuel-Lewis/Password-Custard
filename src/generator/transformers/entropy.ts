import SecureRNG from "secure-rng";
import { Transformer } from "../../types";
import { allCharacters } from "../resources/symbols";
import { getTokenIndicies, shuffleArray } from "../utils";

export const entropy = (percent: number): Transformer => (tokens) => {
  const shuffleIndices = shuffleArray(getTokenIndicies(tokens));
  const selectEntropy = shuffleIndices.slice(
    0,
    Math.round((percent / 100) * shuffleIndices.length)
  );

  selectEntropy.forEach(({ tokenIndex, stringIndex }) => {
    const token = tokens[tokenIndex];
    const replacement = SecureRNG.GenerateString(1, allCharacters.join(""));
    tokens[tokenIndex] =
      token.substr(0, stringIndex) +
      replacement +
      token.substr(stringIndex + replacement.length);
  });

  return tokens;
};
