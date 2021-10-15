const rewire = require("rewire")
const GraphQL = rewire("./GraphQL")
const request = GraphQL.__get__("request")
// @ponicode
describe("request", () => {
    test("0", () => {
        let callFunction = () => {
            request("UNLOCK TABLES;", "UNLOCK TABLES;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            request("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            request("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", "DROP TABLE tmp;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            request("DELETE FROM Projects WHERE pid = %s", "UNLOCK TABLES;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            request("UNLOCK TABLES;", "DROP TABLE tmp;")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            request(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("GraphQL.getUserInfo", () => {
    test("0", () => {
        let callFunction = () => {
            GraphQL.getUserInfo("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            GraphQL.getUserInfo("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            GraphQL.getUserInfo("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            GraphQL.getUserInfo("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            GraphQL.getUserInfo(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            GraphQL.getUserInfo(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("GraphQL.getPersonalRepositories", () => {
    test("0", () => {
        let callFunction = () => {
            GraphQL.getPersonalRepositories("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            GraphQL.getPersonalRepositories("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            GraphQL.getPersonalRepositories(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            GraphQL.getPersonalRepositories("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            GraphQL.getPersonalRepositories("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            GraphQL.getPersonalRepositories(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("GraphQL.getTopLanguage", () => {
    test("0", () => {
        let callFunction = () => {
            GraphQL.getTopLanguage("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            GraphQL.getTopLanguage("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            GraphQL.getTopLanguage("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            GraphQL.getTopLanguage(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            GraphQL.getTopLanguage("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            GraphQL.getTopLanguage(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("GraphQL.getRecentTopLanguages", () => {
    test("0", () => {
        let callFunction = () => {
            GraphQL.getRecentTopLanguages("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            GraphQL.getRecentTopLanguages("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            GraphQL.getRecentTopLanguages("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            GraphQL.getRecentTopLanguages("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            GraphQL.getRecentTopLanguages(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            GraphQL.getRecentTopLanguages(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("GraphQL.getTotalCommits", () => {
    test("0", () => {
        let callFunction = () => {
            GraphQL.getTotalCommits(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            GraphQL.getTotalCommits("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            GraphQL.getTotalCommits("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            GraphQL.getTotalCommits("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            GraphQL.getTotalCommits("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            GraphQL.getTotalCommits(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("GraphQL.getMostRecentCommit", () => {
    test("0", () => {
        let callFunction = () => {
            GraphQL.getMostRecentCommit("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            GraphQL.getMostRecentCommit(123)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            GraphQL.getMostRecentCommit("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            GraphQL.getMostRecentCommit("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            GraphQL.getMostRecentCommit("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            GraphQL.getMostRecentCommit(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("GraphQL.getWeeklyContributionCounts", () => {
    test("0", () => {
        let callFunction = () => {
            GraphQL.getWeeklyContributionCounts("username")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            GraphQL.getWeeklyContributionCounts("user-name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            GraphQL.getWeeklyContributionCounts("user123")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            GraphQL.getWeeklyContributionCounts("user name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            GraphQL.getWeeklyContributionCounts("user_name")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            GraphQL.getWeeklyContributionCounts(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
