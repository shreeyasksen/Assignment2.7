## Assignment

### Brief

Part 1:

When you switch to dark mode, some rows on the `ViewList` table is  unreadable due to the lack of contrast with the background color. Import `ModeContext` into `ViewList.js` and modify its corresponding `ViewList.module.css` to apply the appropriate color styling.

> Hint: The affected table row is tagged in CSS as `tbody tr:nth-of-type(even)`

Part 2:

A user can press the 'Delete' button while editing the same item, which can cause the list to be updated incorrectly when the form is submitted. Modify the code to prevent the user from deleting am item while it is being edited.

> Hint: Use the `isEditing` flag to check if user is in edit mode

Extra Challenge: (Optional)

Refactor `Product.js` to split the editing form into a separate component, e.g. `EditForm.js`. You may use props to share data between the parent and new child component. 

### Submission 

- Submit the URL of the GitHub Repository that contains your work to NTU black board.
- Should you reference the work of your classmate(s) or online resources, give them credit by adding either the name of your classmate or URL. 

### References

_Example of Referencing Classmate_

Referenced the code block below from Terence.
```js
    function printMe(){
        console.log("I am a reference example");
    }
```

_Example of Referencing Online Resources_

- https://developer.mozilla.org/en-US/
- https://www.w3schools.com/html/
- https://stackoverflow.com/questions/14494747/how-to-add-images-to-readme-md-on-github

