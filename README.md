# 💻 LeetMetric

*LeetMetric* is a web-based dashboard that fetches and visualizes *LeetCode user statistics* through the official *GraphQL API*.  
It displays progress in solving *Easy*, *Medium*, and *Hard* problems using *interactive circular progress indicators* and summary cards — all in a clean, responsive UI.


## 🚀 Overview

LeetMetric allows users to enter their *LeetCode username* and instantly view:
- Total questions solved by difficulty
- Submission counts by category
- Visual progress charts for each level

The app uses *HTML, CSS, and JavaScript* with *asynchronous API fetching* and *data-driven DOM rendering* to produce an engaging metrics display.


## ✨ Features

- 🔍 Fetch LeetCode stats using *GraphQL API*
- 🟢 *Circular progress charts* for Easy, Medium, and Hard problems  
- 📊 *Dynamic summary cards* for total submissions  
- 🧩 *Username validation* with regex pattern  
- 💬 *Interactive UI* — clean, responsive, and easy to use  
- ⚙️ Uses *async/await* and *CORS proxy* for API requests  



## 🧠 Technologies Used

*HTML5* - Structure and layout 
*CSS3* - Styling and responsive design 
*JavaScript (ES6)* - Fetching data, dynamic DOM manipulation 
*LeetCode GraphQL API* - Data source for user statistics 
*CORS Anywhere Proxy* - To bypass CORS restrictions during fetch 

## ⚙️ How It Works

1. The user enters their *LeetCode username*.  
2. JavaScript validates the username using a *regex pattern*.  
3. The app sends a *GraphQL POST request* (via CORS proxy) to LeetCode’s API.  
4. Fetched data includes:
   - Total questions by difficulty
   - Accepted and total submissions per difficulty
5. Circular progress indicators and cards update dynamically to show the results.



## 🧮 GraphQL Query Example

graphql
query userSessionProgress($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}


🕹️ Usage
Clone the repository:

git clone https://github.com/yourusername/LeetMetric.git
Open index.html in your browser.

Enter your LeetCode username.

Click Search to fetch your progress stats.

The page displays:

Progress circles for Easy, Medium, and Hard

Submission statistics cards

⚠️ Notes
Since LeetCode’s API doesn’t allow direct CORS access, this project uses:
https://cors-anywhere.herokuapp.com/
You may need to request access from that service before use.

To deploy this project publicly, you can replace the proxy with your own backend proxy (Node.js or Flask).

🖼️ Example Output
Difficulty	Example Visualization
🟢 Easy	Circular progress showing solved/total
🟡 Medium	Intermediate progress ring
🔴 Hard	Lower completion ratio ring

🎨 UI Highlights:

Responsive design built with flexbox
Custom CSS conic gradients for circular progress
Color-coded sections by difficulty
Neat stat cards for clear readability

💡 Future Enhancements:

Dark/light theme toggle
User streak tracking and ranking
Backend proxy integration for direct LeetCode API calls
Animated transitions and chart.js visualization support

👨‍💻 Author:
Yuvraj Bundela
🌐 https://github.com/Yuvr4j-prog
✉️ yuuvrrajj@gmail.com

🏷️ Tags
LeetCode • GraphQL • JavaScript • Web App • Frontend Project • API Integration • Coding Dashboard
