import { OptionalRange } from "../types/number";

export const isNumberInRange = (range: OptionalRange, n: number) => {
	const [min, max] = range;
	return (min === undefined || n >= min) && (max === undefined || n <= max);
};
