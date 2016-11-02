'use strict';

/***************
Variables and Objects
****************/
var questions = {
        strong: 'Do ye like yer drinks strong?',
        salty: 'Do ye like it with a salty tang?',
        bitter: 'Are ye a lubber who likes it bitter?',
        sweet: 'Would ye like a bit of sweetness with yer poison?',
        fruity: 'Are ye one for a fruity finish?',
    },
    ingredients = {
        strong: [
            'Glug of rum',
            'Slug of whisky',
            'Splash of gin'
        ],
        salty: [
            'Olive on a stick',
            'Salt-dusted rim',
            'Rasher of bacon'
        ],
        bitter: [
            'Shake of bitters',
            'Splash of tonic',
            'Twist of lemon peel'
        ],
        sweet: [
            'Sugar cube',
            'Spoonful of honey',
            'Splash of cola'
        ],
        fruity: [
            'Slice of orange',
            'Dash of cassis',
            'Cherry on top'
        ],
    },
    preferences = {};

/**
 * Bartender class that takes orders from the
 * user and makes drinks for them.
 * @returns {object} New instance of the bartender object.
 */
var Bartender = function() {
}

/**
 * Outputs a drink with ingredients to the DOM.
 * @param {object} preferences
 */
Bartender.prototype.createDrink = function(preferences) {
    var usedIngredients = [];

    $('#js-drink-result').empty();

    for (var ingredient in preferences) {
        if (preferences[ingredient]) {
            var randIndex = Math.floor(Math.random() * ingredients[ingredient].length);

            usedIngredients.push(ingredients[ingredient][randIndex]);

            $('#js-drink-result').append('<li>' + usedIngredients[usedIngredients.length - 1] + '</li>');
        }
    }

    this.createName(usedIngredients);

    $('#js-order-form').hide();
    $('#js-results').show();
}

/**
 * Dynamically creates a name based on the ingredients used.
 * @param {array} usedIngredients Array of strings with ingredient names.
 */
Bartender.prototype.createName = function(usedIngredients) {
    var adjective = ['Awesome', 'Zesty', 'Delicious'][Math.floor(Math.random() * 3)],
        noun = usedIngredients[Math.floor(Math.random() * usedIngredients.length)].match(/\s(\w+)$/ig)[0],
        drinkName = titleCase(adjective + noun);

    $('#js-drink-result').prepend('<h2> Here\'s your ' + drinkName + '</h2>');
}

/**
 * Converts a string to title case.
 * https://medium.freecodecamp.com/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27#.900xxuy5c
 * @param   {string}   str
 * @returns {string} A string in title case.
 */
function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

/***************
Document Ready
****************/
$(function() {
    var pirateBartender = new Bartender();

    // Put the questions into the DOM.
    for (var question in questions) {
        var html = '<li><input type="checkbox" name="' + question + '" />' + questions[question] + '</li>';
        $('#js-drink-questions').append(html);
    }


    $('#js-order-form').submit(function(e) {
        e.preventDefault();
        var checked = 0;

        // Put all the checkbox values into the preferences object.
        $('input[type="checkbox"]').each(function() {
            preferences[this.name] = $(this).is(':checked');
            if (preferences[this.name]) {
                checked += 1;
            }
        })

        if (!checked) {
            alert("Yer gonna need at least one ingredient in yer drink matey!");
            return;
        }

        pirateBartender.createDrink(preferences);
    });
});
