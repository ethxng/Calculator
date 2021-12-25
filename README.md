# Calculator
In this project, I will be attempting to recreate the simple calculator app that most people use on iPhone. I will be integrating 3 technologies: HTML, CSS, and Javascript

In my JS file, there are several functions: createCalculator() will use JS DOM structure to create
the calculator layout. 

Then, I have my main code running outside (not within any function). Maybe in the future I should put all of that into a main function and then call that instead.
After my main code, these are just extra functions that I created to assist me in building this application. 

Hurdles I encountered while building this calculator: the concept of forEach in Javascript is not entire the same as the For loop that I learned in Java. The way it's operated is not line by line; rather, it responds to an event that corresponds within the forEach function. I need to get familiar with this concept.

In my CSS file, I had the direction of the number going from right to left, instead of left to right. That modification proves to produce some problems. Originally, when the calculator spits out a negative value, (take 8 - 9 = -1, for example). It displays 1- instead of -1. But note that the calculation is still correct. So I have to find a way to manuever around that roadblock: I tried to manually add a negative character to the end of the string, plus the result times -1. But, the calculation result would turn out to be --1. When I parseInt --1, it would give me an error. So in my getNum function, I filter out such string so that it can parseInt --1 as -1. 