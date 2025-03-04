document.addEventListener("DOMContentLoaded", () => {
    // Command prompt typing effect
    const promptContent = document.querySelector(".prompt-content")
    if (promptContent) {
      const lines = [
        { text: "C:\\Users\\Reyansh> cd projects", delay: 0 },
        { text: "C:\\Users\\Reyansh\\projects> dir", delay: 1000 },
        { text: "Directory of C:\\Users\\Reyansh\\projects", delay: 1500 },
        { text: "", delay: 1600 },
        { text: "05/12/2023  10:15 AM    &lt;DIR&gt;          discord-bot", delay: 2000 },
        { text: "02/28/2024  03:22 PM    &lt;DIR&gt;          portfolio-website", delay: 2300 },
        { text: "01/15/2024  09:45 AM    &lt;DIR&gt;          data-visualization", delay: 2600 },
        { text: "11/20/2023  02:10 PM    &lt;DIR&gt;          mobile-app", delay: 2900 },
        { text: "", delay: 3000 },
        { text: "C:\\Users\\Reyansh\\projects> _", delay: 3500 },
      ]
  
      let currentIndex = 0
  
      function typeLine() {
        if (currentIndex < lines.length) {
          const line = lines[currentIndex]
          const lineElement = document.createElement("div")
          lineElement.className = "prompt-line"
          lineElement.innerHTML = line.text
  
          setTimeout(() => {
            promptContent.appendChild(lineElement)
            promptContent.scrollTop = promptContent.scrollHeight
            currentIndex++
            typeLine()
          }, line.delay)
        } else {
          // Add the question after all lines are typed
          setTimeout(() => {
            const questionLine = document.createElement("div")
            questionLine.className = "prompt-line"
            questionLine.textContent = "Proceed to see projects? (Y/N): "
  
            // Create input element for user interaction
            const inputSpan = document.createElement("span")
            inputSpan.className = "user-input"
            inputSpan.contentEditable = true
            inputSpan.style.outline = "none"
            inputSpan.style.minWidth = "10px"
            inputSpan.style.display = "inline-block"
  
            // Add cursor
            const cursor = document.createElement("span")
            cursor.className = "prompt-cursor"
  
            questionLine.appendChild(inputSpan)
            questionLine.appendChild(cursor)
            promptContent.appendChild(questionLine)
  
            // Focus the input
            inputSpan.focus()
  
            // Handle input
            inputSpan.addEventListener("keydown", (e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                const userInput = inputSpan.textContent.trim().toUpperCase()
  
                // Remove cursor and make input non-editable
                cursor.remove()
                inputSpan.contentEditable = false
  
                // Process response
                setTimeout(() => {
                  const responseLine = document.createElement("div")
                  responseLine.className = "prompt-line"
  
                  if (userInput === "Y") {
                    responseLine.textContent = "Redirecting to projects..."
                    promptContent.appendChild(responseLine)
  
                    // Redirect after a short delay
                    setTimeout(() => {
                      window.location.href = "programs.html"
                    }, 1000)
                  } else if (userInput === "N") {
                    responseLine.textContent = "Ok"
                    promptContent.appendChild(responseLine)
                  } else {
                    responseLine.textContent = "Invalid input. Please type Y or N."
                    promptContent.appendChild(responseLine)
  
                    // Ask again
                    setTimeout(() => {
                      const newQuestionLine = document.createElement("div")
                      newQuestionLine.className = "prompt-line"
                      newQuestionLine.textContent = "Proceed to see projects? (Y/N): "
  
                      const newInputSpan = document.createElement("span")
                      newInputSpan.className = "user-input"
                      newInputSpan.contentEditable = true
                      newInputSpan.style.outline = "none"
                      newInputSpan.style.minWidth = "10px"
                      newInputSpan.style.display = "inline-block"
  
                      const newCursor = document.createElement("span")
                      newCursor.className = "prompt-cursor"
  
                      newQuestionLine.appendChild(newInputSpan)
                      newQuestionLine.appendChild(newCursor)
                      promptContent.appendChild(newQuestionLine)
  
                      newInputSpan.focus()
  
                      // Recursive event listener for the new input
                      newInputSpan.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          const newUserInput = newInputSpan.textContent.trim().toUpperCase()
  
                          newCursor.remove()
                          newInputSpan.contentEditable = false
  
                          setTimeout(() => {
                            const newResponseLine = document.createElement("div")
                            newResponseLine.className = "prompt-line"
  
                            if (newUserInput === "Y") {
                              newResponseLine.textContent = "Redirecting to projects..."
                              promptContent.appendChild(newResponseLine)
  
                              setTimeout(() => {
                                window.location.href = "programs.html"
                              }, 1000)
                            } else if (newUserInput === "N") {
                              newResponseLine.textContent = "Ok"
                              promptContent.appendChild(newResponseLine)
                            } else {
                              newResponseLine.textContent = "Invalid input. Operation cancelled."
                              promptContent.appendChild(newResponseLine)
                            }
                          }, 500)
                        }
                      })
                    }, 1000)
                  }
                }, 500)
              }
            })
          }, 1000)
        }
      }
  
      typeLine()
    }
  
    // Handle scattered cards click events
    const cardItems = document.querySelectorAll(".card-item")
    cardItems.forEach((card) => {
      card.addEventListener("click", () => {
        window.location.href = "portfolio.html"
      })
    })
  })
  
  