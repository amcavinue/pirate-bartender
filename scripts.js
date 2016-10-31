'use strict';

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

var Bartender = function() {
    this.createDrink = function() {

    };
}

$(function() {
    for (var question in questions) {
        var html = '<li><input type="checkbox" name="' + question + '" />' + questions[question] + '</li>';
        $('#js-drink-questions').append(html);
    }


    $('#js-order-form').submit(function(e) {
        e.preventDefault();
        var checked = 0;

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
    });
});
