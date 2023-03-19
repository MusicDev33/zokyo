export const testText = [
  {
    text: 'What is 465 times 89?',
    id: 1,
    isFromUser: true
  },
  {
    text: '465 times 89 is equal to 41,385.',
    id: 2,
    isFromUser: false
  },
  {
    text: 'Hey ChatGPT, how would you invert a function?',
    id: 3,
    isFromUser: true
  },
  {
    text: `To invert a function, you need to switch the input and output variables of the function and then solve for the original input variable. The resulting expression will give you the inverse function.

    Here are the steps to invert a function:
    
        Start with the original function, y = f(x).
    
        Switch the input and output variables to get x = f^-1(y).
    
        Solve for f^-1(y) by isolating y on one side of the equation.
    
        The resulting expression will be the inverse function f^-1(x).
    
    Note that not all functions can be inverted, and for those that can be inverted, the inverse function may not be defined for all values of the original function.`,
    id: 4,
    isFromUser: false
  },
  {
    text: `In this example, the .chat-history div has a fixed height of 80vh and overflow-y: auto, which makes it scrollable. The .chat-bubbles div is inside the .chat-history div, and contains the chat bubbles. It has a display: flex and flex-direction: column to arrange the chat bubbles vertically, and gap: 10px to add some space between the bubbles.

    This should make the chat bubbles scrollable and prevent them from getting squished as new ones are added.`,
    id: 4,
    isFromUser: false
  },
];