var DevContest = artifacts.require("./DevContest.sol");
var MPToken = artifacts.require("./MPToken.sol");

var expect = require("chai").expect;
var assert = require("chai").assert;

var mpToken, devContest;
contract('DevContest', function(accounts) {



    describe("Create instance of the MP Token", function () {
        it("Initialized", function () {
            return MPToken.new().then(function (instance) {
                mpToken = instance;
            });
        });

    });

    describe("Create instance of the DevContest contract with the test Token", function () {

        it("Initialized", function () {
            return DevContest.new(mpToken.address, 0, 2000).then(function (instance) {
                devContest = instance;
            });
        });
    });


    describe("REGISTER SUBMISSION", function () {

        it("Trying empty everything", function () {


            return devContest.registerSubmission("", "", "")
                .then(success, fail);

            function success(suc) {
                return assert.fail();

            }
            function fail(fail) {
                return true;
            }

        });

        it("Trying empty name", function () {

            return devContest.registerSubmission("", "Irrelevant", "Irrelevant")
                .then(success, fail);

            function success(suc) {
                return assert.fail();

            }
            function fail(fail) {
                return true;
            }
        });


        it("Trying empty URL", function () {
            return devContest.registerSubmission("Irrelevant", "Irrelevant", "")
                .then(success, fail);

            function success(suc) {
                return assert.fail();

            }
            function fail(fail) {
                return true;
            }

        });


        describe("Test submitting the same submission twice", function () {
            it("Create instances of the url: example", function () {
                return devContest.registerSubmission("Irrelevant", "Irrelevant", "example")
                    .then(success, fail);

                function success(suc) {
                    return true;

                }
                function fail(fail) {
                    return assert.fail('User couldnt register submission',
                        'User could register a submission',
                        'User could not register a submission!');
                }
            });

            it("Same user submits another submission", function () {
                return devContest.registerSubmission("Irrelevant", "Irrelevant", "123412")
                    .then(fail, success);

                function success(suc) {
                    return true;

                }
                function fail(fail) {
                    return assert.fail('User could submit more than one submission.',
                        'User should not be allowed to register multiple submissions',
                        'User was allowed to submit more than one submission!');
                }
            });

            // Should not allow users to do same submissions as it would be annoying for owner
            // to see so many of the same submission as requests.
            // Possible url to a dictionary each time a submission is submitted and check
            // if key exists, then revert.
            it("Another user submits the url: example", function () {
                return devContest.registerSubmission("Irrelevant", "Irrelevant", "example", { from: accounts[1]})
                    .then(fail, success);

                function success(suc) {
                    return true;

                }
                function fail(fail) {
                    return assert.fail();
                }
            });
        });

    });

    describe("EDIT SUBMISSION", function () {
        it("Edit a submission that does not exist", function () {
            return devContest.editSubmission("Irrelevant", "Irrelevant", "Irrelevant", { from: accounts[1]})
                .then(fail, success);

            function success(suc) {
                return true;

            }
            function fail(fail) {
                return assert.fail('User couldnt register submission',
                    'User could register a submission',
                    'User could not register a submission!');
            }
        });

        describe("Testing leaving a field empty", function () {
            it("Trying empty everything", function () {


                return devContest.editSubmission("", "", "")
                    .then(success, fail);

                function success(suc) {
                    return assert.fail();

                }
                function fail(fail) {
                    return true;
                }

            });

            it("Trying empty name", function () {

                return devContest.editSubmission("", "Irrelevant", "Irrelevant")
                    .then(success, fail);

                function success(suc) {
                    return assert.fail();

                }
                function fail(fail) {
                    return true;
                }
            });


            it("Trying empty URL", function () {
                return devContest.editSubmission("Irrelevant", "Irrelevant", "")
                    .then(success, fail);

                function success(suc) {
                    return assert.fail();

                }
                function fail(fail) {
                    return true;
                }

            });
        });

        describe("Edit a submission to a URL that exists", function () {
            it("Creating submission", function () {
                return devContest.registerSubmission("Irrelevant", "Irrelevant", "notExample", { from: accounts[1]})
                    .then(success, fail);

                function success(suc) {
                    return true;

                }
                function fail(fail) {
                    return assert.fail('User couldnt register submission',
                        'User could register a submission',
                        'User could not register a submission!');
                }
            });

            it("Editing submission to pre-exisiting URL", function () {
                return devContest.editSubmission("Irrelevant", "Irrelevant", "example", { from: accounts[1]})
                    .then(fail, success);

                function success(suc) {
                    return true;

                }
                function fail(fail) {
                    return assert.fail('User could edit submission to previously submitted submission',
                        'User could edit previously submitted URL',
                        'User could edit to a previously used submission url!!!');
                }
            });
        });


        describe("Edit a submission to a new URL leaves the old URL vacant for future use", function () {
            it("Editing submission from example to newURL", function () {
                return devContest.editSubmission("Irrelevant", "Irrelevant", "newURL", { from: accounts[0]})
                    .then(success, fail);

                function success(suc) {
                    return true;

                }
                function fail(fail) {
                    return assert.fail('User couldnt register submission',
                        'User could register a submission',
                        'User could not register a submission!');
                }
            });

            it("Editing new submission using url 'example'", function () {
                return devContest.editSubmission("Irrelevant", "Irrelevant", "example", { from: accounts[1]})
                    .then(success, fail);

                function success(suc) {
                    return true;

                }
                function fail(fail) {
                    return assert.fail('User couldnt edit submission to previously submitted submission',
                        'User could edit previously submitted URL',
                        'User couldnt edit to a vacant used submission url!!!');
                }
            });
        });


    });

    describe("Approve submission", function () {
        describe("Testing Approval of submissions", function () {
            it("Approve Submission that does not exist", function () {
                return devContest.approveSubmission(accounts[3], 1)
                    .then(fail, success);

                function success() {
                    return true;
                }
                function fail(err) {
                    console.log(err);
                    return assert.fail('Submission was approved', // What happened
                        'Submission could not be approved', // What was expected
                        'Submission could be approved!'); // Error message
                }
            });

            it("Approve Submission that does exist", function () {
                return devContest.approveSubmission(accounts[0], 1)
                    .then(success, fail);

                function success() {
                    return true;
                }
                function fail(err) {
                    console.log(err);
                    return assert.fail('Submission could not be approved', // What happened
                        'Submission could be approved', // What was expected
                        'Submission could not be approved!'); // Error message
                }
            });
        });

        describe("Confirming Approval was submitted", function () {
            it("Approval was submitted", function () {
                return devContest.submissions.call(accounts[0])
                    .then(success, fail);

                function success(value) {
                    var approved = value[1];
                    if(approved) {
                        return false;
                    } else {
                        fail();
                    }
                }
                function fail(err) {
                    return assert.fail('Submission could not be approved', // What happened
                        'Submission could be approved', // What was expected
                        'Submission could not be approved!'); // Error message
                };
            });

        })

    });






    describe("STAKE", function () {

        describe("Stake an amount without approval", function () {
            it("Stake 2 without prior approval", function () {
                return devContest.stake(2, {from: accounts[0]})
                    .then(fail, success);

                function success() {
                    return true;
                }

                function fail(err) {
                    console.log(err);
                    return assert.fail('User could stake an amount',
                        'User couldnt stake an amount',
                        'User could stake a amount over the possible amount(2/0)!!');
                }
            })
        })


        describe("Approve user to stake", function () {
            it("Approve 2000 for accounts[0]", function () {
                return mpToken.approve(devContest.address, 200).then(success, fail);

                function success(suc) {
                    return true;

                }

                function fail(fail) {
                    return assert.fail('User couldnt be approved',
                        'User could be approved',
                        'User couldn\'t be approved for 200!');
                }
            });
        });


        describe("Stake amounts", function () {

            it("Stake normal amount(5)", function () {
                return devContest.stake(5, {from: accounts[0]})
                    .then(success, fail);

                function success() {
                    return true;
                }

                function fail(err) {
                    console.log(err);
                    return assert.fail('User couldn\'t stake an amount',
                        'User could stake an amount',
                        'User couldnt stake a normal amount(5)!!');
                }
            });

            it("Stake more than possible amount(5000)", function () {
                return devContest.stake(5000, {from: accounts[0]})
                    .then(fail, success);

                function success() {
                    return true;
                }

                function fail(err) {
                    console.log(err);
                    return assert.fail('User could stake an amount',
                        'User couldnt stake an amount',
                        'User could stake a large amount over the possible amount(5000/200)!!');
                }
            });

            it("Stake negative amount(-5000)", function () {
                return devContest.stake(-5000, {from: accounts[0]})
                    .then(fail, success);

                function success() {
                    return true;
                }

                function fail(err) {
                    console.log(err);
                    return assert.fail('User could stake an amount',
                        'User couldnt stake an amount',
                        'User could stake a negative amount!!');
                }
            });



        });

        describe("RELEASE STAKE", function () {
            describe("User doesnt have stake", function () {
                it("Releasing Stake(1)", function () {
                    return devContest.releaseStake(1, {from: accounts[1]})
                        .then(fail, success);

                    function success() {
                        return true;
                    }
                    function fail(err) {
                        console.log(err);
                        return assert.fail('User could release an amount',
                            'User couldnt release stake wihout prior staking',
                            'User could stake a negative amount!!');
                    }
                });
            });

            describe("User does have stake", function () {
                it("Releasing Stake(1)", function () {
                    return devContest.releaseStake(1, {from: accounts[0]})
                        .then(success, fail);

                    function success() {
                        return true;
                    }
                    function fail(err) {
                        console.log(err);
                        return assert.fail('User could release an amount',
                            'User couldnt release stake wihout prior staking',
                            'User could stake a negative amount!!');
                    }
                });

                it("Releasing more stake than possible(5000)", function () {
                    return devContest.releaseStake(5000, {from: accounts[0]})
                        .then(fail, success);

                    function success() {
                        return true;
                    }
                    function fail(err) {
                        console.log(err);
                        return assert.fail('User could stake an amount',
                            'User couldnt release stake that was more than possible',
                            'User could release stake on  an amount greater than existing stake!!');
                    }
                });
            });

        });

        describe("VOTE" , function () {
            describe("User doesnt have stake", function () {
                it("Voting", function () {
                    return devContest.vote(accounts[0], {from: accounts[1]})
                        .then(fail, success);

                    function success() {
                        return true;
                    }
                    function fail(err) {
                        console.log(err);
                        return assert.fail('User could release an amount', // What happened
                            'User couldnt release stake wihout prior staking', // What was expected
                            'User could stake a negative amount!!'); // Error message
                    }
                });
            });

            describe("User does have stake", function () {
                it("Voting", function () {
                    return devContest.vote(accounts[0], {from: accounts[0]})
                        .then(success, fail);

                    function success() {
                        return true;
                    }
                    function fail(err) {
                        console.log(err);
                        return assert.fail('User couldnt vote', // What happened
                            'User could vote', // What was expected
                            'User couldnt vote when they currently have stake!'); // Error message
                    }
                });
            });


            describe("User voting multiple times", function () {
                for(var i =0; i< 2; i++) {
                    it("Voting for time number " +i, function () {
                        return devContest.vote(accounts[0], {from: accounts[0]})
                            .then(fail, success);

                        function success() {
                            return true;
                        }
                        function fail(err) {
                            console.log(err);
                            return assert.fail('User could vote multiple times', // What happened
                                'User could not vote', // What was expected
                                'User could vote on count number' + i +'!'); // Error message
                        }
                    });
                }
            });


            describe("Vote increased check", function () {
                    it("Check if vote increased by 4", function () {
                        return devContest.submissions.call(accounts[0])
                            .then(success, fail);

                        function success(obj) {
                            var votesCount = obj[6];
                            if(votesCount.toString() == '4') {
                                return true;
                            } else {
                                fail();
                            }
                            return true;
                        }
                        function fail(err) {
                            return assert.fail('User could vote multiple times', // What happened
                                'User could not vote', // What was expected
                                'User could vote on count number' + i +'!'); // Error message
                        }
                    });
            });

        });

        describe("Remove Vote", function () {
            it("Remove non-existing vote", function () {
                return devContest.removeVote(accounts[0], {from: accounts[2]})
                    .then(fail, success);

                function success() {
                    return true;
                }
                function fail(err) {
                    console.log(err);
                    return assert.fail('User could remove vote that doesnt exist', // What happened
                        'User couldnt remove non-existent vote', // What was expected
                        'User could remove a vote that did not exist previously'); // Error message
                }
            });


            it("Remove existing vote", function () {
                return devContest.removeVote(accounts[0], {from: accounts[0]})
                    .then(success, fail);

                function success() {
                    return true;
                }
                function fail(err) {
                    console.log(err);
                    return assert.fail('User couldnt remove previous vote', // What happened
                        'User could remove his previous vote', // What was expected
                        'User couldnt remove his previous vote!'); // Error message
                }
            });
        })
    });










});