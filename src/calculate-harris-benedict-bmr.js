import isNumber from 'is-number';
import { bmrMultipliers } from './bmr-multipliers';

function isPositiveNumber(num) {
  return isNumber(num) && num > 0;
}

function positiveNumberErrorMessage(parameter) {
  return `The Harris-Benedict formula requires ${parameter} to be a positive number.`;
}

export default function calculateHarrisBenedictBmr({
  weight,
  height,
  age,
  isMale = true,
  useImperial = true,
  useMifflinJeor = true
} = {}) {
  if (!isPositiveNumber(weight)) {
    throw new Error(positiveNumberErrorMessage('weight'));
  }
  if (!isPositiveNumber(height)) {
    throw new Error(positiveNumberErrorMessage('height'));
  }
  if (!isPositiveNumber(age)) {
    throw new Error(positiveNumberErrorMessage('age'));
  }

  let measurement = useImperial ? 'imperial' : 'metric';
  let gender = isMale ? 'male' : 'female';
  let formula = useMifflinJeor
    ? bmrMultipliers['mifflinStJeor']
    : bmrMultipliers['original'];

  let genderSelection = formula[gender];

  let base = genderSelection.base;
  let weightMultiplier = genderSelection.weight[measurement];
  let heightMultiplier = genderSelection.height[measurement];
  let ageMultiplier = genderSelection.age;

  return (
    base +
    weightMultiplier * weight +
    heightMultiplier * height -
    ageMultiplier * age
  );
}
