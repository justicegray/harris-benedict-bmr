import calculateHarrisBenedictBmr from '../src/calculate-harris-benedict-bmr';

describe('Calculation throws error', () => {
  test('if weight is not provided', () => {
    let bmrArgsWithoutWeight = {
      height: 70,
      age: 25
    };

    expect(() => {
      calculateHarrisBenedictBmr(bmrArgsWithoutWeight);
    }).toThrow();
  });

  test('if height is not provided', () => {
    let bmrArgsWithoutHeight = {
      weight: 170,
      age: 25
    };

    expect(() => {
      calculateHarrisBenedictBmr(bmrArgsWithoutHeight);
    }).toThrow();
  });

  test('if age is not provided', () => {
    let bmrArgsWithoutAge = {
      height: 70,
      weight: 170
    };

    expect(() => {
      calculateHarrisBenedictBmr(bmrArgsWithoutAge);
    }).toThrow();
  });

  test('if weight is less than or equal to 0', () => {
    let bmrArgsWithoutWeight = {
      weight: -5,
      height: 70,
      age: 25
    };

    expect(() => {
      calculateHarrisBenedictBmr(bmrArgsWithoutWeight);
    }).toThrow();
  });

  test('if height is less than or equal to 0', () => {
    let bmrArgsWithoutHeight = {
      height: -100,
      weight: 170,
      age: 25
    };

    expect(() => {
      calculateHarrisBenedictBmr(bmrArgsWithoutHeight);
    }).toThrow();
  });

  test('if age is less than or equal to 0', () => {
    let bmrArgsWithoutAge = {
      height: 70,
      weight: 170,
      age: 0
    };

    expect(() => {
      calculateHarrisBenedictBmr(bmrArgsWithoutAge);
    }).toThrow();
  });
});

describe('Calculation defaults', () => {
  test('to imperial measurements if no measurement is supplied', () => {
    let bmrArgsWithDefault = {
      weight: 175,
      height: 70,
      age: 25,
      isMale: true
    };
    let bmrArgsWithImperialSpecified = {
      ...bmrArgsWithDefault,
      useImperial: true
    };
    let bmrArgsWithMetricSpecified = {
      ...bmrArgsWithDefault,
      useImperial: false
    };

    let bmrWithDefault = calculateHarrisBenedictBmr(bmrArgsWithDefault);
    let bmrWithImperialSpecified = calculateHarrisBenedictBmr(
      bmrArgsWithImperialSpecified
    );
    let bmrWithMetricSpecified = calculateHarrisBenedictBmr(
      bmrArgsWithMetricSpecified
    );
    expect(bmrWithDefault).toEqual(bmrWithImperialSpecified);
    expect(bmrWithDefault).not.toEqual(bmrWithMetricSpecified);
  });

  test('to male if no gender argument is supplied', () => {
    let bmrArgsWithDefault = {
      weight: 175,
      height: 70,
      age: 25,
      useImperial: true
    };
    let bmrArgsWithImperialSpecified = {
      ...bmrArgsWithDefault,
      isMale: true
    };
    let bmrArgsWithMetricSpecified = {
      ...bmrArgsWithDefault,
      isMale: false
    };

    let bmrWithDefault = calculateHarrisBenedictBmr(bmrArgsWithDefault);
    let bmrWithMaleSpecified = calculateHarrisBenedictBmr(
      bmrArgsWithImperialSpecified
    );
    let bmrWithFemaleSpecified = calculateHarrisBenedictBmr(
      bmrArgsWithMetricSpecified
    );
    expect(bmrWithDefault).toEqual(bmrWithMaleSpecified);
    expect(bmrWithDefault).not.toEqual(bmrWithFemaleSpecified);
  });

  test('to Mifflin-Jeor formula if no formula is supplied', () => {
    let bmrArgsWithDefault = {
      weight: 175,
      height: 70,
      age: 25,
      useImperial: true,
      isMale: true
    };

    let bmrArgsWithMifflinJeorSpecified = {
      ...bmrArgsWithDefault,
      useMifflinJeor: true
    };

    let bmrArgsWithOriginalFormulaSpecified = {
      ...bmrArgsWithDefault,
      useMifflinJeor: false
    };

    let bmrWithDefault = calculateHarrisBenedictBmr(bmrArgsWithDefault);
    let bmrWithMifflinJeor = calculateHarrisBenedictBmr(
      bmrArgsWithMifflinJeorSpecified
    );
    let bmrWithOriginal = calculateHarrisBenedictBmr(
      bmrArgsWithOriginalFormulaSpecified
    );
    expect(bmrWithDefault).toEqual(bmrWithMifflinJeor);
    expect(bmrWithDefault).not.toEqual(bmrWithOriginal);
  });
});

describe('Original formula', () => {
  // Men	BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)
  test('produces the correct value for males using metric', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: false,
      isMale: true,
      useMifflinJeor: false
    };
    let sampleMaleBmr =
      88.362 +
      13.397 * bmrArgs.weight +
      4.799 * bmrArgs.height -
      5.677 * bmrArgs.age;

    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleMaleBmr);
  });

  // Women	BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)
  test('produces the correct value for females using metric', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: false,
      isMale: false,
      useMifflinJeor: false
    };
    let sampleFemaleBmr =
      447.593 +
      9.247 * bmrArgs.weight +
      3.098 * bmrArgs.height -
      4.33 * bmrArgs.age;

    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleFemaleBmr);
  });

  test('produces the correct value for males using imperial', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: true,
      isMale: true,
      useMifflinJeor: false
    };
    let sampleMaleBmr =
      88.362 +
      6.076772024 * bmrArgs.weight +
      12.18946 * bmrArgs.height -
      5.677 * bmrArgs.age;
    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleMaleBmr);
  });

  test('produces the correct value for females using imperial', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: true,
      isMale: false,
      useMifflinJeor: false
    };
    let sampleFemaleBmr =
      447.593 +
      4.194365224 * bmrArgs.weight +
      7.86892 * bmrArgs.height -
      4.33 * bmrArgs.age;

    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleFemaleBmr);
  });
});

describe('Mifflin St-Jeor revised formula', () => {
  // Men	BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
  test('produces the correct value for males using metric', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: false,
      isMale: true,
      useMifflinJeor: true
    };
    let sampleMaleBmr =
      10 * bmrArgs.weight + 6.25 * bmrArgs.height - 5 * bmrArgs.age + 5;

    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleMaleBmr);
  });

  // Women	BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
  test('produces the correct value for females using metric', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: false,
      isMale: false,
      useMifflinJeor: true
    };
    let sampleFemaleBmr =
      10 * bmrArgs.weight + 6.25 * bmrArgs.height - 5 * bmrArgs.age - 161;
    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleFemaleBmr);
  });

  test('produces the correct value for males using imperial', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: true,
      isMale: true,
      useMifflinJeor: true
    };
    let sampleMaleBmr =
      4.53592 * bmrArgs.weight + 15.875 * bmrArgs.height - 5 * bmrArgs.age + 5;
    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleMaleBmr);
  });

  test('produces the correct value for females using imperial', () => {
    let bmrArgs = {
      weight: 100,
      height: 180,
      age: 35,
      useImperial: true,
      isMale: false,
      useMifflinJeor: true
    };
    let sampleFemaleBmr =
      4.53592 * bmrArgs.weight +
      15.875 * bmrArgs.height -
      5 * bmrArgs.age -
      161;
    expect(calculateHarrisBenedictBmr(bmrArgs)).toEqual(sampleFemaleBmr);
  });
});
