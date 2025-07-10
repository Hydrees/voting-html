//load from localStorage or start fresh
//vote counts stored in an object
let votes = JSON.parse(localStorage.getItem("votes")) || {
    time: 0,
    spiritual: 0,
    distraction: 0,
    fear: 0,
    support: 0,
    circle: 0,
};

//show existing results (on page load)
/*let totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);
if (totalVotes > 0) {
    displayResults(totalVotes);
}; */

//event listener to button
document.getElementById("submitBtn").addEventListener("click" , () => {
    //to get the selected radio option
    const selected = document.querySelector('input[name="challenge"]:checked');

    if (!selected) {
        alert("please select an option before voting.");
        return;
    }
//to increase vote count for the selected option
    const value = selected.value; 
    votes[value]++;

    //to save back to local storage
    localStorage.setItem("votes" , JSON.stringify(votes));

//to calculate total votes
    const totalVotes = 
    Object.values(votes).reduce((sum,count) => sum + count, 0);

//to display result
    displayResults(totalVotes);


});
//to update the result using function
function displayResults(total) {
    const resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";

    for (let option in votes) {
        const percent = ((votes[option] / total) * 100).toFixed(1);

        const bar = `
        <div class="mb-4">
            <p class="mb-1 capitalize">${option} - ${percent}% (${votes[option]} votes) </p>
            <div class="w-full bg-gray-200 rounded-full h-5">
                <div class="bg-green-500 h-5 rounded-full transition-all duration-500"  style="width: ${percent}%;"></div>
            </div>
        </div>
        ` ;
        resultContainer.innerHTML += bar ;
    };
};