require(['../lib/underscore-min', '../lib/jquery-1.7.min'], function () {

    function randomFrom(arr) {
        return  arr[parseInt(Math.random() * arr.length)]
    }

    var sums = {
        add: function (value) {
            return  function () {
                return randomFrom(_.range(1, 100)) + ' + ' + value;
            };
        },
        minus: function (value) {
            return function () {
                return randomFrom(_.range(parseInt(value), 100)) + ' - ' + value;
            };
        },
        divide: function (value) {
            var options = _.range(1, parseInt(70 / value));
            console.log(randomFrom(options) * value);

            return  function () {
                return (randomFrom(options) * value) + ' ÷ ' + value;
            };
        },
        times: function (value) {
            return  function () {
                return randomFrom(_.range(1, 13)) + ' x ' + value;
            };
        }
    };

    function gen(count, options) {
        var questions = {};
        var maxIterations = count * count;
        while (_.keys(questions).length < count && maxIterations-- > 0) {
            var newQuestion = randomFrom(options)();
            questions[newQuestion] = newQuestion;
        }
        $('#questions ol').empty();
        _.each(questions, function (q) {
            return $('<li>').text('   ' + q + ' = ').appendTo($('#questions div ol'));
        });
    }

    var questionCount = 25;

    var sentences = [];

    $('#questions').hide();

    var generate = $('#generate').hide();

    $('#addSentence').click(function () {
        var newSum = sums[$('#sum').val()]($('#value').val());
        sentences.push(newSum);
        generate.show();
        $('#sentences').append($('<li>').text(newSum()));
    });

    generate.click(function () {
        gen(questionCount, sentences);
        $('#entry').hide();
        $('#questions').show();
    });

});
