
document.addEventListener ("DOMContentLoaded" ,function() {

    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress")
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");

    function validateUsername(username) {
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,14}[a-zA-Z0-9]$/;
        
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;

    }

    async function fetchUserDetails(username) {

        try{

            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const proxyurl = 'https://cors-anywhere.herokuapp.com/'
            const targetUrl = 'https://leetcode.com/graphql/';
            //concatennated url : https://cors-anywhere.herokuapp.com/https://leetcode.com/graphql/
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
            query: "\n  query userSessionProgress($username: String!) {\n    allQuestionsCount {\n      difficulty\n      count\n    }\n    matchedUser(username: $username) {\n      submitStats {\n        acSubmissionNum {\n          difficulty\n          count\n          submissions\n        }\n        totalSubmissionNum {\n          difficulty\n          count\n          submissions\n        }\n      }\n    }\n  }\n",
            variables: { "username": `${username}` }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyurl+targetUrl, requestOptions);

            if(!response.ok){
                throw new Error("Unable to fetch the user details")
            }
            
            const parseddata = await response.json();
            console.log("loggin data : " , parseddata);

            displayUserdata(parseddata);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved,total,label,circle){
        const progressDegree = (solved/total) * 100;
        circle.style.setProperty("--progress-degree" , `${progressDegree}%`); 
        label.textContent = `${solved}/${total}`;
    }

    function displayUserdata(parseddata){
        const totalQues = parseddata.data.allQuestionsCount[0].count;
        const totalEasyQues = parseddata.data.allQuestionsCount[1].count;
        const totalMediumQues = parseddata.data.allQuestionsCount[2].count;
        const totalHardQues = parseddata.data.allQuestionsCount[3].count;

        const solvedTotalQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parseddata.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedTotalEasyQues,totalEasyQues,easyLabel,easyProgressCircle);
        updateProgress(solvedTotalMediumQues,totalMediumQues,mediumLabel,mediumProgressCircle);
        updateProgress(solvedTotalHardQues,totalHardQues,hardLabel,hardProgressCircle);

        const cardsData = [
            {label : "Overall Submissions", value:parseddata.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
            {label : "Overall Easy Submissions", value:parseddata.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
            {label : "Overall Medium Submissions", value:parseddata.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
            {label : "Overall Hard Submissions", value:parseddata.data.matchedUser.submitStats.totalSubmissionNum[3].submissions}

        ];

        cardStatsContainer.innerHTML = cardsData.map(
            data => 
                    `<div class = "card">
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                    </div>`      
        ).join("");

    }


    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log("loggin username: ",username);

        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    })
})