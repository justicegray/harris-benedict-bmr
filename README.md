# harris-benedict-bmr
Function for calculating basal metabolic rate the Harris-Benedict way.  
A companion package that calculates BMR using the Katch-McArdle method can be found at    
[katch-mcardle-bmr](https://github.com/justicegray/katch-mcardle-bmr).

## Installation
Install the package via `npm`:
```
npm install harris-benedict-bmr --save
```

or `yarn`:
```
yarn add harris-benedict-bmr
```

## Usage

Import:
```
import calculateHarrisBenedictBmr from 'calculate-harris-benedict-bmr';
```

The function signature itself is as follows:
```
calculateHarrisBenedictBmr({weight,
    height,
    age,
    isMale = true,
    useImperial = true,
    useMifflinJeor = true})
```

`weight`: Weight in pounds or kilograms (see `useImperial` below).  The calculation will throw an error if weight is not a number above 0.

`height`: Height in inches or cm (see `useImperial` below).  The calculation will throw an error if height is not a number above 0.

`age`: Age in years.  The calculation will throw an error if age is not a number above 0.

`isMale`: Distinguishes between male and female coefficents for the calculation.

`useImperial`: When true (the default), assumes weight and height are in imperial measurements (pounds and inches, respectively).  When false, assumes weight and height are in metric measurements (kg and cm, respectively).

`useMifflinJeor`: There have been 2 revisions to the original 1918 formula to make it more accurate.  The first revision was by Roza and Shizgai in 1984, and the second was by Mifflin and St Jeor in 1990.  This calculation defaults to using the Mifflin-Joer revision as it is the most accurate.  If for some reason the user would prefer to use the Roza/Shizgai revision setting this value to false will change the calculation.  The original 1918 version is not present in this library.  If someone from the previous century feels keenly enough about its inclusion, they are welcome to submit a patch to add its presence. =) 

## License

This package is under an [ISC license](./LICENSE).

## Contributing

This package has a suite of unit tests written in [Jest](https://jestjs.io).  Alterations or additions are expected to have unit tests present in the PR.  

[Prettier](https://prettier.io/) is used for code formatting and can be run using `npm run pretty` - please use it on any changes that would be made.
